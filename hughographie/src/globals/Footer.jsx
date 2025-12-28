import { NavLink } from 'react-router-dom';

export default function Footer({ blok }) {
    if (!blok || Object.keys(blok).length === 0) {
        return <footer><p>Footer (No data)</p></footer>;
    }

    return (
        <footer>
            <a className="inverse" href="https://www.github.com/hugh-burgess" target="_blank" rel="noreferrer">Github</a>
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
