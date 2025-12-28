import { Link, NavLink } from 'react-router-dom';

export default function Header({ blok }) {
    if (!blok || Object.keys(blok).length === 0) {
        return <header>No header data</header>;
    }

    return (
        <header className='light'>
            <Link to="/" className="logo">{blok.title || 'Logo'}</Link>
            <ul>
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