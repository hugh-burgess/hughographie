import processedImageUrl from "../utils/imageOptimization";

const C5Stage = ({ blok }) => {
        const imageProps = processedImageUrl(blok.image.filename);
    return <>
        <section className="stage">
            {blok.image && <img
            {...imageProps}
            className={`image ${blok.imagePosition || ''}`} src={blok.image.filename} alt="Stage" />}
        </section>
    </>
};

export default C5Stage;