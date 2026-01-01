import { StoryblokComponent } from '@storyblok/react';
import { useEffect, useState } from 'react';
import { getGlobals } from './storyblok/api/client';

export default function Layout({ children }) {
    const [globals, setGlobals] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            {globals && globals.header?.content && <StoryblokComponent blok={globals.header.content} key={0} />}
            <main>
                {children}
            </main>
            {globals && globals.footer?.content && <StoryblokComponent blok={globals.footer.content} key={1} />}
        </>
    );
}
