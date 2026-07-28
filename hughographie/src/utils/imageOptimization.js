export default function processedImageUrl(image, aspectRatio = "auto") {
    if (!image?.filename) {
        return {
            src: "",
            srcSet: "",
            sizes: "",
            loading: "lazy",
            aspectRatio,
        };
    }

    const filename = image.filename.split("/").pop();

    const ext = filename.substring(filename.lastIndexOf("."));
    const base = filename.substring(0, filename.lastIndexOf("."));

    const mobileSrc = `/assets/images/${base}-500${ext}`;
    const tabletSrc = `/assets/images/${base}-800${ext}`;
    const desktopSrc = `/assets/images/${base}-1200${ext}`;
    const xlDesktopSrc = `/assets/images/${base}-1500${ext}`;

    return {
        src: desktopSrc,
        srcSet: `
            ${mobileSrc} 500w,
            ${tabletSrc} 800w,
            ${desktopSrc} 1200w,
            ${xlDesktopSrc} 1500w
        `.replace(/\s+/g, " ").trim(),
        sizes: "(max-width: 640px) 500px, (max-width: 1024px) 800px, (max-width: 1280px) 1200px, 1500px",
        loading: "lazy",
        aspectRatio,
    };
}