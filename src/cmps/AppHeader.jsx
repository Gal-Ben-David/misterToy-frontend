import { NavLink } from 'react-router-dom'
import { useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'

export function AppHeader() {

    const menu = useRef()
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedInUser)

    function onLogout() {
        logout()
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onToggleMenu() {
        menu.current.classList.toggle('active')
    }

    return (
        <header className="app-header full">
            <section className="header-container">
                <div className='logo'>
                    <div className='img-teddy-bear-logo'>
                        <img src='src/assets/img/teddy-bear-logo.png' />
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
                    <NavLink to="/login" >{loggedinUser ? 'Log out' : 'Log in'}</NavLink>
                </nav>
            </section>
        </header>
    )
}