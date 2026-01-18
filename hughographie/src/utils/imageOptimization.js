const processedImageUrl = (image, aspectRatio = 'auto') => {
    if (!image.filename) {
        return {
            src: '',
            srcSet: '',
            sizes: '',
            loading: 'lazy',
            aspectRatio
        };
    }

    // Mobile: 500 width
    const mobileSrc = `${image.filename}/m/500x0/`;

    // Tablet: 800 width
    const tabletSrc = `${image.filename}/m/800x0/`;

    // Desktop: 1200 width
    const desktopSrc = `${image.filename}/m/1200x0/`;

    // XLDesktop: 1500 width
    const xlDesktopSrc = `${image.filename}/m/1500x0/`;

    return {
        src: image.filename,  // Default fallback
        srcSet: `${mobileSrc} 500w, ${tabletSrc} 800w, ${desktopSrc} 1200w, ${xlDesktopSrc} 1500w, ${image.filename}`,
        sizes: '(max-width: 640px) 500px, (max-width: 1024px) 800px, (max-width: 1280px) 1200px, (max-width: 1500px) 1500px, 100%',
        loading: 'lazy',
        aspectratio: aspectRatio
    };
}

export default processedImageUrl;