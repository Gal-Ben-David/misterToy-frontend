import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
            <section className="header-container">
                <h1>MisterToy</h1>
                <nav className="app-nav">
                    {/* <NavLink to="/" >Home</NavLink> */}
                    <NavLink to="/" >Our Toys</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
        </header>
    )
}