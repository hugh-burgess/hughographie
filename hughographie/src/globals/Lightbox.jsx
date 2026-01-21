import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Lightbox = ({ children }) => {
    const location = useLocation()
    const [overlay, setOverlay] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(document.documentElement.clientWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (location.pathname !== "/gallery") return children

    const Overlay = () => {
        return <div className="overlay">{children}</div>
    }

    const setOverlayState = (value) => {
        if (isMobile) return false
        const html = document.documentElement
        if (value) {
            html.classList.add('no-scroll')
        } else {
            html.classList.remove('no-scroll')
        }

        return setOverlay(value)
    }


    return <div className={`lightbox ${overlay ? 'overlay-visible' : ''}`} onClick={() => setOverlayState(!overlay)}>
        {children}
        {overlay && <Overlay onClick={() => setOverlayState(false)} />}
    </div>
}

export default Lightbox;