import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import { processNavLinks } from '../utils/processNavLinks';

import { CiSun } from 'react-icons/ci';
import { IoMoonOutline } from 'react-icons/io5';
import Button from '../elements/Button';

const Navigation = ({ blok, footerItems, isMobile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { toggleDarkMode, isDarkMode } = useDarkMode()
    const themeToIcon = !isDarkMode ? <CiSun /> : <IoMoonOutline />


    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isMobile && isOpen) {
            setIsOpen(false);
        }
    }, [isMobile, isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 200)
    };

    const navigationItems = [
        ...(blok?.nav || []),
        ...(footerItems?.nav || []),
        ...(footerItems?.metaLinks || [])
    ]
    return (
        <nav className="navigation">
            <Button
                className={`burger-toggle ${isOpen ? 'open' : ''}`}
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </Button>

            <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li className="mobile-darkmode-toggle" onClick={() => toggleDarkMode()}>{themeToIcon ?? <CiSun />}</li>
                    <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                    {navigationItems.map((item, index) => processNavLinks(item, index, closeMenu, true))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;