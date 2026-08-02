import { StoryblokComponent } from '@storyblok/react';
import { useEffect, useState } from 'react';
import { getGlobals } from './utils/storyblokApiClient';

export default function Layout({ children }) {
    const [globals, setGlobals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const fetchGlobals = async () => {
            const { header, footer } = await getGlobals();
            setGlobals({ header, footer });
            setLoading(false);
        };
        fetchGlobals();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (loading) {
        return children;
    }

    const mobileFooterNavItems = {metaLinks: globals.footer.content.metaLinks, nav: globals.footer.content.nav}

    return (
        <>
            {globals && globals.header?.content && <StoryblokComponent blok={globals.header.content} key={0} isMobile={isMobile} footerItems={mobileFooterNavItems} />}
            <main>
                {children}
            </main>
            {globals && globals.footer?.content && <StoryblokComponent blok={globals.footer.content} key={1} isMobile={isMobile} />}
        </>
    );
}
