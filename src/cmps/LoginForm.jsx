import { useState } from "react"
import { useNavigate } from 'react-router'
import { userService } from "../services/user.service.js"

export function LoginForm({ isSignup, onLogin }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    return (
        <form className="login-form" onSubmit={(ev) => onLogin(ev, credentials)}>
            <h2>{isSignup ? 'Create Account' : 'Log in'}</h2>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
                autoComplete="off"
            />
            {isSignup && <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Full name"
                onChange={handleChange}
                required
            />}
            <button className="btn btn-dark btn-login">{isSignup ? 'Sign up' : 'Log in'}</button>
        </form>
    )
}