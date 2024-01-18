import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../api"

export default function AuthRequired() {
    const location = useLocation()
    const [authenticated, setAuthenticated] = React.useState()

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
    })

    if (authenticated === true) {
        return <Outlet />
    }
    else if (authenticated === false) {
        return (
            <Navigate 
                to="/login" 
                state={{
                    message: "You must log in first",
                    from: location.pathname
                }} 
                replace
            />
        )
    }
}