import { getStoryblokApi } from "@storyblok/react";

export async function getGlobals() {
    const storyblokApi = getStoryblokApi();

    const getStory = (res, type) => {
        return res.data.stories.find(story => story.full_slug === `globals/${type}`);
    };

    try {
        const response = await storyblokApi.get('cdn/stories/', {
            version: 'draft',
            starts_with: 'globals',
        });

        return {
            header: getStory(response, 'header'),
            footer: getStory(response, 'footer')
        };
    } catch (error) {
        console.error('Error fetching globals:', error);
        return null;
    }
}