import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <>
            <nav className="host-nav">
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => isActive ? activeStyles : null}
                    title="Dashboard"
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="income"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    title="Income"
                >
                    Income
                </NavLink>
                
                <NavLink
                    to="vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    title="Vans"
                >
                    Vans
                </NavLink>

                <NavLink
                    to="reviews"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    title="Reviews"
                >
                    Reviews
                </NavLink>

            </nav>
            <Outlet />
        </>
    )
}