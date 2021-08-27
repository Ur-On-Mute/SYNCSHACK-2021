import React from 'react'
import Link from 'next/link';

const NavBar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand navbar-dark sticky-top home-bar" style={{backgroundColor : '#333333', paddingLeft: 20}}>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav mr-auto">
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
                </div>
                <div className="float-right sign-in" style={{paddingRight: 20}}>
                    <button className="btn btn-success" type="submit">Sign in</button>
                </div>
            </nav>
            
        </div>
    )
}

export default NavBar;