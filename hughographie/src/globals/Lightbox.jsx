import { useState } from "react";

const Lightbox = ({ children }) => {
    const [overlay, setOverlay] = useState(false)
    const Overlay = () => {
        return <div className="overlay">{children}</div>
    }

    return <div className="lightbox" onClick={() => setOverlay(!overlay)}>
        {children}
        {overlay && <Overlay onClick={() => setOverlay(false)}/>}
        </div>
}

export default Lightbox;