import { NavLink } from "react-router-dom";

export function processNavLinks(item, index, onClick, isMobileMenu) {
    if (!item || (isMobileMenu && item.hideInMobileMenu)) return null
    const checkForEmailInLink = (link) => {
        switch (link.linktype) {
            case 'email':
                return `mailto:${link.cached_url || link.url}`;
            default:
                return link.cached_url || link.url;
        }
    };

    if (!item.title || !item.link) return null

    if (item.link.linktype === 'story') {
        return (
            <li key={item._uid || index}>
                <NavLink
                    to={item.link.cached_url || '#'}
                    className={({ isActive }) => isActive ? "active" : ""}
                    onClick={onClick}
                >
                    {item.title}
                </NavLink>
            </li>
        )
    }

    return (
        <li key={item._uid || index}>
            <a
                href={checkForEmailInLink(item.link)}
                target="_blank"
                rel="noreferrer">
                {item.title}
            </a>
        </li>
    )
}