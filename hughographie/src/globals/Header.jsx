import { ReactComponent as Logo } from "../icons/logo.svg";
import { Link, NavLink } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import Navigation from './Navigation';

export default function Header({ blok, isMobile, footerItems }) {
    const { toggleDarkMode, isDarkMode } = useDarkMode()
    const themeToIcon = !isDarkMode ? <CiSun /> : <IoMoonOutline />

    if (!blok || Object.keys(blok).length === 0) {
        return <header>No header data</header>;
    }

    return (
        <header>
            <Link to="/" className="logo">{isMobile ? <Logo /> : blok.title}</Link>
            <ul className='desktop-nav'>
                <li className="desktop-darkmode-toggle" onClick={() => toggleDarkMode()}>{themeToIcon ?? <CiSun />}</li>
                {blok.nav?.map((item) => (
                    item.title && (<li key={item._uid}>
                        <NavLink to={item.link?.cached_url || '#'}
                            className={({ isActive }) => isActive ? "active" : ""}>
                            {item.title}</NavLink>
                    </li>)))}
            </ul>
            <Navigation blok={blok} footerItems={footerItems} isMobile={isMobile} />
        </header>
    );
}