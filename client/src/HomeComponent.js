import React from 'react'
import {Link} from 'react-router-dom'

function HomeComponent()
{
    return(
    <div>
        <div>
            <h1>Register/Sign in</h1>
            <Link to="/register" style={{textDecoration:'none'}}> <button id="registerBtn">Register</button></Link>
            <Link to="/login" style={{textDecoration:'none'}}> <button id="loginBtn">Login</button></Link>
        </div>
    </div>
    )
}

export default HomeComponent