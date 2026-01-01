import { Link, NavLink } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";

export default function Header({ blok, theme }) {
    const { toggleDarkMode } = useDarkMode()
    if (!blok || Object.keys(blok).length === 0) {
        return <header>No header data</header>;
    }

    return (
        <header className={theme}>
            <Link to="/" className="logo">{blok.title || 'Logo'}</Link>
            <ul>
                <li className="darkmode-toggle" onClick={() => toggleDarkMode()}>{theme === 'dark' ? <CiSun /> : <IoMoonOutline />}</li>
                {blok.nav?.map((item) => (
                    item.title && (<li key={item._uid}>
                        <NavLink to={item.link?.cached_url || '#'}
                            className={({ isActive }) => isActive ? "active" : ""}>
                            {item.title}</NavLink>
                    </li>)
                ))}
            </ul>
        </header>
    );
}