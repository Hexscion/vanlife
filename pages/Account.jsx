import React from "react"
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"
import { auth, logoutUser } from "../api";

export default function Account() {
    const [authenticated, setAuthenticated] = React.useState();
    let user = auth.currentUser;
    const navigate = useNavigate();

    function handleLogout() {
        logoutUser();
    }

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

    React.useEffect(() => {
        if (authenticated === false) {
            navigate("/login");
        }
    }, [authenticated])

    return (
        <div className="account-page-container">
            <h1>Hello {user?.email}</h1>
            <button className="link-button" onClick={handleLogout}>Logout</button>
        </div>
    )
}