import { NavLink } from 'react-router-dom'
import { useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'

export function AppHeader() {

    const menu = useRef()
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedInUser)

    async function onLogout() {
        try {
            await logout()
            navigate('/')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
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
                    {/* <NavLink to="/" >Home</NavLink> */}
                    <NavLink to="/" >Toys</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    {console.log('loggedInUser', loggedinUser)}

                    {loggedinUser && <div className="user-info">Hello {loggedinUser.fullname}</div>}
                    <NavLink to="/login" >{loggedinUser ? <button className="btn" onClick={onLogout}>Log out</button> : 'Log in'}</NavLink>
                </nav>
            </section>
        </header>
    )
}