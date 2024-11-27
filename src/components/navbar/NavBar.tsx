import { useEffect, useMemo, useRef } from "react"
import { Link, useLocation } from "react-router-dom"

interface NavbarProps {
    navOpen: boolean
}

const Navbar = ({ navOpen }: NavbarProps) => {
    const location = useLocation() // Get current location
    const lastActiveLink = useRef<HTMLAnchorElement | null>(null)
    const activeBox = useRef<HTMLDivElement | null>(null)

    const navItems = useMemo(
        () => [
            { label: 'home', link: '/home', className: 'nav-link' },
            { label: 'schedule', link: '/schedule', className: 'nav-link' },
            { label: 'busroute', link: '/busroute', className: 'nav-link' },
            { label: 'fareestimate', link: '/fareestimate', className: 'nav-link' },
            { label: 'bustracking', link: '/bustracking', className: 'nav-link md:hidden' }
        ],
        []
    )

    const initActiveBox = () => {
        if (lastActiveLink.current && activeBox.current) {
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = lastActiveLink.current
            activeBox.current.style.top = `${offsetTop}px`
            activeBox.current.style.left = `${offsetLeft}px`
            activeBox.current.style.width = `${offsetWidth}px`
            activeBox.current.style.height = `${offsetHeight}px`
        }
    }

    useEffect(() => {
        const activeLink = document.querySelector(
            `.nav-link[href="${location.pathname}"]`
        ) as HTMLAnchorElement

        if (activeLink) {
            if (lastActiveLink.current) {
                lastActiveLink.current.classList.remove('active')
            }
            activeLink.classList.add('active')
            lastActiveLink.current = activeLink
        }

        initActiveBox()
    }, [location.pathname]) // Trigger on path change

    return (
        <nav className={'navbar ' + (navOpen ? 'active' : '')}>
            {navItems.map(({ label, link, className }, key) => (
                <Link
                    to={link}
                    key={key}
                    className={className}
                >
                    {label}
                </Link>
            ))}
            <div className="active-box" ref={activeBox}></div>
        </nav>
    )
}

export default Navbar
