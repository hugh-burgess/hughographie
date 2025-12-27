export function processedImageUrl(imageUrl) {
    if (!imageUrl) {
        return {
            src: '',
            srcSet: '',
            sizes: ''
        };
    }

    // Mobile: 500 width
    const mobileSrc = `${imageUrl}/m/500x0/filters:rotate(270)`;

    // Tablet: 800 width
    const tabletSrc = `${imageUrl}/m/800x0/filters:rotate(270)`;

    // Desktop: 1200 width
    const desktopSrc = `${imageUrl}/m/1200x0/filters:rotate(270)`;

    // XLDesktop: 1500 width
    const xlDesktopSrc = `${imageUrl}/m/1500x0/filters:rotate(270)`;

    return {
        src: imageUrl,  // Default fallback
        srcSet: `${mobileSrc} 500w, ${tabletSrc} 800w, ${desktopSrc} 1200w, ${xlDesktopSrc} 1500w, ${imageUrl}`,
        sizes: '(max-width: 640px) 500px, (max-width: 1024px) 800px, (max-width: 1280px) 1200px, (max-width: 1500px) 1500px, 100%'
    };
}

export default processedImageUrl;