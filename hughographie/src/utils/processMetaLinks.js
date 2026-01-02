import { NavLink } from "react-router-dom";

import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

export function processMetaLinks(metaItems, index, isMobile, isNavigation) {
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
        const title = isNavigation ? metaLinkLogos[index] : meta.title
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

    return processMetaLinks(metaItems, index, isMobile)
}