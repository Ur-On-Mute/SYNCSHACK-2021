import React from 'react'
//import { Link, withRouter } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand navbar-dark sticky-top" style={{backgroundColor : '#333333', paddingLeft: 20}}>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" to="/home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" to="/forum">Forum</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" to="/forum">About</a>
                    </li>
                </ul>
                    
            </nav>
        </div>
    )
}

export default NavBar;