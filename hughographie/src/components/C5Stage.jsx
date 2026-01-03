import processedImageUrl from "../utils/imageOptimization";
import C4Video from "./C4Video";

const C5Stage = ({ blok }) => {
        const imageProps = processedImageUrl(blok.image.filename);
    return <>
        <section className="stage">
            {blok.video[0] && <C4Video blok={blok.video[0]} />}
            {blok.image && <img
            {...imageProps}
            className={`image ${blok.imagePosition || ''}`} src={blok.image.filename} alt="Stage" />}
        </section>
    </>
};

export default C5Stage;