import './Nav.css'

export default function Navigation() {
    return (
        <>
            <nav className="nav-menu">
                <img src="" alt="Logo" />
                <ul className="nav-ul">
                    <div className="div-list">
                        <ul className="div-ul-top-nav">
                            <li><a href="">Home</a></li>
                            <li><a href="">Course</a></li>
                        </ul>

                        <ul className="div-ul-bottom-nav">
                            <li><a href="">Account</a></li>
                            <li><a href="">Sign Out</a></li>
                        </ul>
                    </div>
                </ul>
            </nav>
        </>
    )
}