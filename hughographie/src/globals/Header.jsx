export default function Header({ blok }) {
    const isActive = (item) => {
        return window.location.pathname.substring(1) === item.link?.cached_url;
    }

    if (!blok || Object.keys(blok).length === 0) {
        return <header>No header data</header>;
    }

    return (
        <header>
            <a href="/">{blok.title || 'Logo'}</a>
            <ul>
                {blok.nav?.map((item) => (
                    item.title && (<li key={item._uid}>
                        <a href={item.link?.cached_url || '#'} className={isActive(item) ? 'active' : ''}>{item.title}</a>
                    </li>)
                ))}
            </ul>
        </header>
    );
}