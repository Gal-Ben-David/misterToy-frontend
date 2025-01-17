import { useState } from "react"
import { useNavigate } from 'react-router'
import { userService } from "../services/user.service.js"
import { login } from "../store/actions/user.actions.js"


export function LoginForm({ isSignup }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username) return
        await login(credentials)
        navigate('/')
    }

    return (
        <form className="login-form" onSubmit={onLogin}>
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