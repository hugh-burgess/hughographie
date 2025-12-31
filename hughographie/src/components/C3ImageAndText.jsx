import processedImageUrl from "../utils/imageOptimization";
import C2RichText from "./C2RichText";

const C3ImageAndText = ({ fields }) => {
    const { variant, image, content } = fields;
    const imageProps = processedImageUrl(image.filename);
    const imageFirst = variant === 'imageText';
    return (
        <section className={`image-and-text-grid ${imageFirst ? '' : 'reverse'}`}>
            {
                image &&
                <div
                    key={image._uid}
                    className="image"
                >
                    <img
                        {...imageProps}
                        alt={image.alt || ""}
                        loading="lazy"
                    />
                </div>
            }
            {content && <C2RichText className="text" content={content} />}
        </section>
    );
}

export default C3ImageAndText;