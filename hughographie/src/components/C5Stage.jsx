import { FaLongArrowAltDown } from "react-icons/fa";
import C4Video from "./C4Video";

const C5Stage = ({ blok }) => {
    const handleScrollDown = () => {
        window.scrollTo({
            top: document?.getElementById('end-scroll').offsetTop,
            behavior: 'smooth'
        });
    }

    return <>
        <section className="stage">
            {blok.video[0] && <C4Video blok={blok.video[0]} />}
            {blok.title && <h1>{blok.title}</h1>}
            {blok.showScrollButton && <button onClick={handleScrollDown} className="scroll-button"><FaLongArrowAltDown /></button>}
        </section>
        <div aria-hidden="true" id="end-scroll"></div>
    </>
};

export default C5Stage;