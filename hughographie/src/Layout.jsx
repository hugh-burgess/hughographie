import { StoryblokComponent } from '@storyblok/react';
import { useEffect, useState } from 'react';
import { getGlobals } from './storyblok/api/client';
import useDarkMode from './hooks/useDarkMode';

export default function Layout({ children }) {
    const [globals, setGlobals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const { isDarkMode } = useDarkMode()

    const theme = isDarkMode ? 'dark' : 'light'

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

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [theme])

    if (loading) {
        return children;
    }

    const mobileFooterNavItems = {metaLinks: globals.footer.content.metaLinks, nav: globals.footer.content.nav}

    return (
        <>
            {globals && globals.header?.content && <StoryblokComponent blok={globals.header.content} theme={theme} key={0} isMobile={isMobile} footerItems={mobileFooterNavItems} />}
            <main className={theme}>
                {children}
            </main>
            {globals && globals.footer?.content && <StoryblokComponent blok={globals.footer.content} theme={theme} key={1} isMobile={isMobile} />}
        </>
    );
}
