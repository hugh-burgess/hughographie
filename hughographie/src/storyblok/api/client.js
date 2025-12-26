import { getStoryblokApi } from "@storyblok/react";

export async function getGlobals() {
    const storyblokApi = getStoryblokApi();

    try {
        const res = await storyblokApi.get('cdn/stories/', {
            version: 'draft',
            starts_with: 'globals/',
        });
        return res.data?.stories;
    } catch (error) {
        console.error('Error fetching globals:', error);
        return null;
    }
}