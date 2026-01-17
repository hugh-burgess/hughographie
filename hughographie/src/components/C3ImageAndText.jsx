import Image from "../globals/Image";
import C2RichText from "./C2RichText";

const C3ImageAndText = ({ fields }) => {
    const { variant, image, content, imageRatio, imagePosition } = fields;
    const imageFirst = variant === 'imageText';
    const availableText = content.content[0].content
    return (
        <section className={`image-and-text-grid ${imageFirst ? '' : 'reverse'} ${imageRatio ?? ''} ${imagePosition ?? ''}`}>
            {image && <Image image={image} containerClassName="image" />}
            {availableText && <C2RichText className="text" content={content} />}
        </section>
    );
}

export default C3ImageAndText;