import { NavLink } from 'react-router-dom';
import { processMetaLinks } from '../utils/processMetaLinks';

export default function Footer({ blok, theme, isMobile }) {

    if (!blok || Object.keys(blok).length === 0) {
        return <footer><p>Footer (No data)</p></footer>;
    }

    return (
        <footer className={theme}>
            <div className='meta-links'>
                {blok.metaLinks && blok.metaLinks.map((meta, index) => processMetaLinks(meta, index, isMobile, false))}
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
