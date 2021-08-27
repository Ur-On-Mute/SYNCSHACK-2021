import React from 'react'
import Link from 'next/link';

const NavBar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand navbar-dark sticky-top" style={{backgroundColor : '#333333', paddingLeft: 20}}>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link href="/home">
                            <a class="nav-link" href="/home">Home</a>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link href="/forum">
                            <a class="nav-link">Forum</a>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link href="/about">
                            <a class="nav-link" >About</a>
                        </Link>
                    </li>
                </ul>
                <ul class="navbar-nav" style={{backgroundColor: "#333333", paddingRight: 20}}>
                    <button className="btn btn-outline-default"></button>
                </ul>
                    
            </nav>
        </div>
    )
}

export default NavBar;