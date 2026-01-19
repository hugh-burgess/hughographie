import Image from "../globals/Image";
import C2RichText from "./C2RichText";

const C3ImageAndText = ({ fields }) => {
    const { variant, image, content } = fields;
    const imageFirst = variant === 'imageText';
    const availableText = content.content[0].content
    const imageItem = image[0]
    return (
        <section className={`image-and-text-grid ${imageFirst ? '' : 'reverse'}`}>
            {imageItem && <Image image={imageItem.image} containerClassName="image"
                objectPosition={imageItem.objectPosition}
                aspectRatio={imageItem.aspectRatio}
            />}
            {availableText && <C2RichText className="text" content={content} />}
        </section>
    );
}

export default C3ImageAndText;