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

    function onCloseMenu() {
        if (window.innerWidth <= 400) {
            console.log('hi')
            if (menu.current.classList.contains('active')) {
                menu.current.classList.remove('active')
            }
        }
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
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={onCloseMenu}>Toys</NavLink>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')} onClick={onCloseMenu}>About</NavLink>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')} onClick={onCloseMenu}>Dashboard</NavLink>

                    {loggedinUser && <div className="user-info">Hello {loggedinUser.fullname} 💫</div>}
                    <NavLink to="/login" onClick={onCloseMenu}>{loggedinUser ? <button className="btn" onClick={() => { onLogout(); onCloseMenu() }}>Log out</button> : 'Log in'}</NavLink>
                </nav>
            </section>
        </header>
    )
}