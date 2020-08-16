import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active px-4">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item px-4">
                    <NavLink to="/about" className="nav-link" >About</NavLink>
                </li>
                </ul>
            </div>
            </nav>
    )
}
