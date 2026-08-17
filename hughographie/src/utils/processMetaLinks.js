import { NavLink } from "react-router-dom";

export function processMetaLinks(metaItems, index, isMobile, isNavigation) {
    const checkForEmailInLink = (link) => {
        switch (link.linktype) {
            case 'email':
                return `mailto:${link.cached_url || link.url}`;
            default:
                return link.cached_url || link.url;
        }
    };

    const processMetaLinks = (meta, index) => {
        if (meta.link.linktype === 'story') {
            return <NavLink
                key={index}
                to={meta.link?.cached_url || '#'}>
                {meta.title}
            </NavLink>
        } else
            return <a
                key={index}
                href={checkForEmailInLink(meta.link)}
                target="_blank"
                rel="noreferrer">
                {meta.title}
            </a>
    }

    return processMetaLinks(metaItems, index, isMobile)
}