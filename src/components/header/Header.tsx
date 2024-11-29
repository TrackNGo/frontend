import { Link } from "react-router-dom"
import NavBar from "../navbar/NavBar"
import { useState } from "react"
import trackngologo from '../../assets/img/trackngo_logo.png'

const Header = () => {
    const [navOpen, setNavOpen] = useState<boolean>(false)

    const toggleNav = () => setNavOpen(!navOpen)
    return (
        <div className="mx-0 mt-0 mb-20 p-0 pb-4">
            <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-950 to-zinc-950/75">
                <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">
                    <h1>
                        {/*<Link to="/" className="logo">*/}
                        {/* <img src="" width={40} height={40} alt="trackngo"/>*/}
                        {/*IMG*/}
                        {/*</Link>*/}
                        <a href="/" className="logo">
                            <img src={trackngologo} width={200} height={180} alt="trackngo"/>
                        </a>
                    </h1>

                    <div className="relative md:justify-self-center">
                        <button onClick={toggleNav} className="menu-btn md:hidden">
                            <div className="material-symbols-rounded">
                                {navOpen ? 'close' : 'menu'}
                            </div>
                        </button>
                        <NavBar navOpen={navOpen} />
                    </div>

                    <Link to="/login" className="btn1 btn1-secondary max-md:hidden md:justify-self-end">
                        Login
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Header