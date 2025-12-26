import { StoryblokComponent } from '@storyblok/react';
import { useEffect, useState } from 'react';
import { getGlobals } from './storyblok/api/client';

export default function Layout({ children }) {
    const [globals, setGlobals] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGlobals = async () => {
            const data = await getGlobals();
            setGlobals(data);
            setLoading(false);
        };
        fetchGlobals();
    }, []);

    if (loading) {
        return children;
    }

    return (
        <>
            {globals.map((global) => {
                return global.content.component === 'Header' && <StoryblokComponent blok={global.content} />
            })}
            <main>
                {children}
            </main>
            {globals.map((global) => {
                return global.content.component === 'Footer' && <StoryblokComponent blok={global.content} />
            })}
        </>
    );
}
