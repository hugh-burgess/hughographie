import { processNavLinks } from '../utils/processNavLinks';

export default function Footer({ blok, isMobile }) {

    if (!blok || Object.keys(blok).length === 0) {
        return <footer><p>Footer (No data)</p></footer>;
    }

    const footerNavItems = [
        ...(blok.metaLinks?.length > 0 ? blok.metaLinks : []),
        ...(blok.nav?.length > 0 ? blok.nav : [])
    ]

    return (
        <footer>
            <nav>
                <ul>
                    {footerNavItems?.map((item, index) => processNavLinks(item, index, null, false))}
                </ul>
            </nav>
        </footer>
    );
}
