import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import { processMetaLinks } from '../utils/processMetaLinks';

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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 200)
    };

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
                    {blok?.nav?.map((item) => (
                        item.title && (
                            <li key={item._uid}>
                                <NavLink
                                    to={item.link?.cached_url || '#'}
                                    className={({ isActive }) => isActive ? 'active' : ''}
                                    onClick={closeMenu}
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        )
                    ))}
                    {footerItems.nav.length > 0 ? (
                        <div>
                            {footerItems.nav?.map((navItem, index) =>
                                <NavLink
                                    className={({ isActive }) => isActive ? "active" : ""}
                                    key={index} to={navItem.link?.cached_url || '#'}
                                    onClick={closeMenu}
                                >
                                    {navItem.title}
                                </NavLink>
                            )}
                        </div>
                    ) : null}
                </ul>
                {footerItems.metaLinks.length > 0 ? (
                    <div className='meta-links'>
                        {footerItems.metaLinks.map((meta, index) => processMetaLinks(meta, index, isMobile, true))}
                    </div>
                ) : null}
            </div>
        </nav>
    );
};

export default Navigation;