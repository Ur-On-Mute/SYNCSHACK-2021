import React from 'react'
import Link from 'next/link';

const NavBar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand navbar-dark sticky-top home-bar" style={{backgroundImage : 'linear-gradient(to right, #300707, #1c1c1c)', paddingLeft: 20, paddingTop: 20, paddingBottom: 20, fontSize: 20}}>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-text">
                            <Link href="/home">
                                <a class="nav-link" href="/home">Home</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link href="/">
                                <a class="nav-link">Forum</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link href="/about">
                                <a class="nav-link" >About</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="float-right sign-in" style={{paddingRight: 20}}>
                    <Link href="/login">
                        <button className="btn btn-success" type="submit">Sign in</button>
                    </Link>
                </div>
            </nav>
            
        </div>
    )
}

export default NavBar;