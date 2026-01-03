import processedImageUrl from "../utils/imageOptimization";

const C4Video = ({ blok }) => {
    const imageProps = processedImageUrl(blok.placeholder.filename);
    if (!blok.source.id) return null
    return <div className="video">
        <video
            className="source"
            src={blok.source.filename}
            controls
            autoPlay
            muted
            loop
        />
        {blok.placeholder.filename && <img
            {...imageProps}
            className="placeholder" src={blok.placeholder.filename} alt="Placeholder" />}
        {blok.caption &&
            <caption>© {blok.caption}</caption>}
    </div>

}

export default C4Video;