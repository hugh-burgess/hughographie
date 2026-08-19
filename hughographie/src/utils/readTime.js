export default function readTime(text) {
    const averageWPM = 260;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

    return `${Math.max(1, Math.ceil(wordCount / averageWPM))} min read`;
}