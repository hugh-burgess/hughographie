import Image from "../globals/Image";

const C5Stage = ({ blok }) => {
    const item = blok.image[0]
    return <>
        <section className="stage">
            {item && <Image
                image={item.image}
                className={`image ${item.imagePosition || ''}`} />
            }
        </section>
    </>
};

export default C5Stage;