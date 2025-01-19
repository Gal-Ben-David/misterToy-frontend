import { NavLink } from 'react-router-dom'
import { useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { useNavigate } from 'react-router'

export function AppHeader() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const navigate = useNavigate()
    const menu = useRef()

    async function onLogout() {
        try {
            await logout()
            navigate('/login')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
            throw err
        }
    }

    function onToggleMenu() {
        menu.current.classList.toggle('active')
    }

    return (
        <header className="app-header full">
            <section className="header-container">
                <div className='logo'>
                    <div className='img-teddy-bear-logo'>
                        <img src='/img/teddy-bear-logo.png' />
                    </div>
                    <h1>MisterToy</h1>
                </div>
                <i className="fa-solid fa-ellipsis hamburger" onClick={onToggleMenu}></i>
                <nav className="app-nav" ref={menu}>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Toys</NavLink>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>

                    {loggedinUser && <div className="user-info">Hello {loggedinUser.fullname}</div>}
                    <NavLink to="/login" >{loggedinUser ? <button className="btn" onClick={onLogout}>Log out</button> : 'Log in'}</NavLink>
                </nav>
            </section>
        </header>
    )
}