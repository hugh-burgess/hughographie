import Image from "../globals/Image";

const C5Stage = ({ blok }) => {
    return <>
        <section className="stage">
            {blok.image && <Image
                image={blok.image}
                className={`image ${blok.imagePosition || ''}`} />
            }
        </section>
    </>
};

export default C5Stage;