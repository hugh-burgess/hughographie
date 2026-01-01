import { NavLink } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { useEffect, useState } from 'react';

export default function Footer({ blok }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const metaLinkLogos = [<FaGithub />, <IoMdMail />, <RiInstagramFill />];
    const checkForEmailInLink = (link) => {
        switch (link.linktype) {
            case 'email':
                return `mailto:${link.cached_url || link.url}`;
            default:
                return link.cached_url || link.url;
        }
    };

    const processMetaLinks = (meta, index) => {
        const title = isMobile ? meta.title : metaLinkLogos[index]
        if (meta.link.linktype === 'story') {
            return <NavLink
                key={index}
                to={meta.link?.cached_url || '#'}>
                {title}
            </NavLink>
        } else
            return <a
                key={index}
                href={checkForEmailInLink(meta.link)}
                target="_blank"
                rel="noreferrer">
                {title}
            </a>
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!blok || Object.keys(blok).length === 0) {
        return <footer><p>Footer (No data)</p></footer>;
    }

    return (
        <footer className='light'>
            <div className='meta-links'>
                {blok.metaLinks && blok.metaLinks.map((meta, index) => processMetaLinks(meta, index))}
            </div>
            <div>{blok.nav?.map((navItem, index) =>
                <NavLink
                    className={({ isActive }) => isActive ? "active" : ""}
                    key={index} to={navItem.link?.cached_url || '#'}>
                    {navItem.title}
                </NavLink>
            )}</div>
        </footer>
    );
}
