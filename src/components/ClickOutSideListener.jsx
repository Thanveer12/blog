import React, { useEffect, useRef, useState } from "react"

const ClickOutSideListener = ({children, onOutsideClick}) => {
    const domRef = useRef();
    

    useEffect(() => {

        document.addEventListener('click', isClickedOutside)

        return () => {
            document.removeEventListener('click',isClickedOutside)
        }

    }, [])

    const isClickedOutside = (e) => {
        if (listener(e)) {
            if (onOutsideClick) onOutsideClick();
        }
    }

    const listener = (e) => {
        if (!domRef.current.contains(e.target)) {
            return true;
        }
        return false
    }

    return (
        <div ref={domRef}>
            {children}
        </div>
    )
}

export default ClickOutSideListener;