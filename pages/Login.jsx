import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { loginUser, auth } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)
    const [authenticated, setAuthenticated] = React.useState()

    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from || "/account";

    React.useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true)
            }
            else {
                setAuthenticated(false)
            }
        })

        return () => unsub()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        loginUser(loginFormData)
            .then(data => {
                setError(null)
                navigate(from, { replace: true })
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setStatus("idle")
            })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    React.useEffect(() => {
        if (authenticated === true) {
            navigate("/account")
        }
    }, [authenticated])

    return (
        <div className="login-container">
        {
            location.state?.message &&
                <h3 className="login-error">{location.state.message}</h3>
        }
        <h1>Log in to your account</h1>
        {
            error?.message &&
                <h3 className="login-error">{error.message}</h3>
        }

        <form onSubmit={handleSubmit} className="login-form">
            <input
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="Email address"
                value={loginFormData.email}
                />
            <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Password"
                value={loginFormData.password}
                />
            <button
                disabled={status === "submitting"}
                >
                {status === "submitting"
                    ? "Logging in..."
                    : "Log in"
                }
            </button>
        </form>

        <p>Don't have an account? <a href="/signup"><u>Create one</u></a></p>
    </div>
    )
}