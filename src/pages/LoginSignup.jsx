import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from '../cmps/LoginForm.jsx'

export function LoginSignup() {
    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    async function _login(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Logged in successfully, user ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Oops try again', err)
        }
    }

    async function _signup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Signed in successfully, welcome ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup', err)
        }
    }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btn btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Sign Up here'
                    }
                </a >
            </div>
        </div >
    )
}
