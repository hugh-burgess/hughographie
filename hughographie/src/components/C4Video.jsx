const C4Video = ({ blok }) => {
    return <div className="video">
        {/* {blok.source.id &&
            <video
                className="source"
                src={blok.source.filename}
                controls
                autoPlay
                muted
                loop
            />} */}
        {blok.placeholder && <img className="placeholder" src={blok.placeholder.filename} alt="Placeholder image" />}
        {blok.caption &&
            <caption>© {blok.caption}</caption>}
    </div>
}

export default C4Video;