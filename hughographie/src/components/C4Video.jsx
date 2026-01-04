import processedImageUrl from "../utils/imageOptimization";

const C4Video = ({ blok }) => {
    const imageProps = processedImageUrl(blok.placeholder.filename);
    return <div className="video">
        {blok.source.id && <video
            className="source"
            src={blok.source.filename}
            controls
            autoPlay
            muted
            loop
        />}
        {blok.placeholder.filename && <img
            {...imageProps}
            className="placeholder"
            alt="Placeholder" />}
        {blok.caption &&
            <caption>© {blok.caption}</caption>}
    </div>

}

export default C4Video;