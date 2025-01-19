import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useNavigate } from 'react-router'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from '../cmps/LoginForm.jsx'
import registrationImg from '/img/registeration-teddy-face2.svg'

export function LoginSignup() {
    const [isSignup, setIsSignUp] = useState(false)
    const navigate = useNavigate()

    // function onLogin(credentials) {
    //     isSignup ? _signup(credentials) : _login(credentials)
    // }

    async function onLogin(ev = null, credentials) {
        if (ev) ev.preventDefault()

        if (!credentials.username) return

        if (isSignup) await signup(credentials)
        else await login(credentials)
        navigate('/')
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
                <div className="registration">
                    <div className="login-or-signup">
                        <span>{isSignup ? 'Already a member?' : 'New user?'}</span>
                        <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                            <span className="registration-action">{isSignup ? 'Log in' : 'Sign up here'}</span>
                        </a >
                    </div>

                    {!isSignup &&
                        <div className="guest-mode">
                            <input type="checkbox"
                                onChange={() => onLogin(undefined, { username: 'Guest', password: '123' })} />
                            <span>Continue as Guest</span>
                        </div>
                    }
                </div>

            </div>

            <div className="registration-img">
                <img src={registrationImg} />
            </div>

        </div >
    )
}
