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

    const extensionIndex = filename.lastIndexOf(".");

    const ext = extensionIndex !== -1
        ? filename.substring(extensionIndex)
        : "";

    const base = extensionIndex !== -1
        ? filename.substring(0, extensionIndex)
        : filename;

    const mobileSrc = `/assets/images/${base}-500${ext}`;
    const tabletSrc = `/assets/images/${base}-800${ext}`;
    const desktopSrc = `/assets/images/${base}-1200${ext}`;
    const xlDesktopSrc = `/assets/images/${base}-1500${ext}`;

    return {
        src: desktopSrc,

        fallbackSrc: image.filename,

        srcSet: `
            ${mobileSrc} 500w,
            ${tabletSrc} 800w,
            ${desktopSrc} 1200w,
            ${xlDesktopSrc} 1500w
        `.replace(/\s+/g, " ").trim(),

        sizes: `
            (max-width: 640px) 500px,
            (max-width: 1024px) 800px,
            (max-width: 1280px) 1200px,
            1500px
        `.replace(/\s+/g, " ").trim(),

        loading: "lazy",
        aspectRatio,
    };
}