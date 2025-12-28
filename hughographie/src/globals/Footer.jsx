import { NavLink } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer({ blok }) {
    if (!blok || Object.keys(blok).length === 0) {
        return <footer><p>Footer (No data)</p></footer>;
    }

    return (
        <footer className='dark'>
            <div className='meta-links'>
                <a className="inverse" href="https://www.github.com/hugh-burgess" target="_blank" rel="noreferrer"><FaGithub /></a>
                <a className="inverse" href="mailto:hughographie@hotmail.com" target="_blank" rel="noreferrer"><IoMdMail /></a>
                <a className="inverse" href="https://www.instagram.com/hughographie" target="_blank" rel="noreferrer"><RiInstagramFill /></a>
            </div>
            <div>{blok.nav?.map((navItem, index) =>
                <NavLink
                    className={({ isActive }) => isActive ? "inverse active" : "inverse"}
                    key={index} to={navItem.link?.cached_url || '#'}>
                    {navItem.title}
                </NavLink>
            )}</div>
        </footer>
    );
}
