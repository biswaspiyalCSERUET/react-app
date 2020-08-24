import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const NavBar = () => {
    const history = useHistory()
    return (
        <div className="norm">
            <div className="nav-wrapper white">
                <Link to="/" className="cus ">Shopping Cart</Link>
                {history.push("/")}
            </div>
        </div>
    )
}

export default NavBar