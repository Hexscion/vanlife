import React from "react"

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer>&#169;{year} #VANLIFE</footer>
    )
}