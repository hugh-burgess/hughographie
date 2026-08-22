import Image from "../elements/Image";
import C2RichText from "./C2RichText";

const C3ImageAndText = ({ fields }) => {
    const { variant, image, content, isImageAThird } = fields;
    const imageFirst = variant === 'imageText';
    const availableText = content.content[0].content
    const imageItem = image[0]
    return (
        <section className={`image-and-text-grid ${imageFirst ? '' : 'reverse'} ${isImageAThird ? 'image-third' : ''}`}>
            {imageItem && <Image item={imageItem} containerClassName="image"
            />}
            {availableText && <C2RichText className="text" content={content} />}
        </section>
    );
}

export default C3ImageAndText;