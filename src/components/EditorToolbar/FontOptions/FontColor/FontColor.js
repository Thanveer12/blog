import React, { useState } from 'react'
import style from './style.module.scss'

const FontColor = ({handleColor}) => {
    const [currentColor, setCurrentColor] = useState('#ffffff');
    const onColorSelected = (e) => {
        setCurrentColor(e.target.value)
        handleColor(e, 'color', e.target.value)
    }
    return (
        <div className={style['font-color-wrapper']}>
            <span className={style['font-color-icon']} />
            <input id={style['color-input']} type='color' value={currentColor} onChange={(e) => onColorSelected(e)} />
        </div>
    )
}

export default FontColor