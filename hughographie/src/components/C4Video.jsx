import Image from "../elements/Image";

const C4Video = ({ blok }) => {
    return <div className="video">
        {!!blok.source.id ? <video
            className="source"
            src={blok.source.filename}
            controls
            muted
            loop
            poster={blok.placeholder.filename}
        /> : blok.placeholder.filename ? <Image item={{ image: blok.placeholder }} className="placeholder" /> : null}
        {blok.caption && <caption>© {blok.caption}</caption>}
    </div>

}

export default C4Video;