import { StoryblokComponent } from '@storyblok/react';
import { useEffect, useState } from 'react';
import { getGlobals } from './storyblok/api/client';
import useDarkMode from './hooks/useDarkMode';

export default function Layout({ children }) {
    const [globals, setGlobals] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useDarkMode()
    useEffect(() => {
        const fetchGlobals = async () => {
            const { header, footer } = await getGlobals();
            setGlobals({ header, footer });
            setLoading(false);
        };
        fetchGlobals();
    }, []);

    if (loading) {
        return children;
    }

    const theme = isDarkMode ? 'dark' : 'light'

    return (
        <>
            {globals && globals.header?.content && <StoryblokComponent blok={globals.header.content} theme={theme} key={0} />}
            <main className={theme}>
                {children}
            </main>
            {globals && globals.footer?.content && <StoryblokComponent blok={globals.footer.content} theme={theme} key={1} />}
        </>
    );
}
