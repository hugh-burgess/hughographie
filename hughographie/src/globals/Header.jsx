import { useLayoutEffect, useRef } from 'react';
import { ReactComponent as Logo } from "../icons/logo.svg";
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import Navigation from './Navigation';

export default function Header({ blok, isMobile, footerItems }) {
    const { toggleDarkMode, isDarkMode } = useDarkMode()
    const themeToIcon = !isDarkMode ? <CiSun /> : <IoMoonOutline />
    const location = useLocation();
    const navRef = useRef(null);

    // logic for the track under active nav items
    useLayoutEffect(() => {
        const nav = navRef.current;
        if (!nav) return undefined;

        const updateTrack = () => {
            const activeLink = nav.querySelector('a.active');
            const track = nav.querySelector('.track');

            if (!activeLink || !track) {
                track?.classList.remove('visible');
                return;
            }

            const navBounds = nav.getBoundingClientRect();
            const linkBounds = activeLink.getBoundingClientRect();
            track.style.setProperty('--track-width', `${linkBounds.width}px`);
            track.style.setProperty('--track-offset', `${linkBounds.left - navBounds.left}px`);
            track.classList.add('visible');
        };

        updateTrack();
        const resizeObserver = new ResizeObserver(updateTrack);
        resizeObserver.observe(nav);

        return () => resizeObserver.disconnect();
    }, [location.pathname]);

    if (!blok || Object.keys(blok).length === 0) {
        return <header>No header data</header>;
    }

    return (
        <header>
            <Link to="/" className="logo">{isMobile ? <Logo /> : blok.title}</Link>
            <ul className="desktop-nav" ref={navRef}>
                <li className="desktop-darkmode-toggle" onClick={() => toggleDarkMode()}>{themeToIcon ?? <CiSun />}</li>
                {blok.nav?.map((item) => (
                    item.title && (<li key={item._uid}>
                        <NavLink to={item.link?.cached_url || '#'}
                            className={({ isActive }) => isActive ? "active" : ""}>
                            {item.title}</NavLink>
                    </li>)))}
                    <div className="track"></div>
            </ul>
            <Navigation blok={blok} footerItems={footerItems} isMobile={isMobile} />
        </header>
    );
}