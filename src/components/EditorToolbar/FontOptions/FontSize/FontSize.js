import React, { useState } from 'react'
import style from './style.module.scss'

const FontSize = ({currentSize, setCurrentSize}) => {
   
    return (
        <div className={style['font-size']}>
            <span title='Decrease' onClick={currentSize <= 10 ? () => { } : () => setCurrentSize(currentSize - 1)}>-</span>
            <span>{currentSize}</span>
            <span title='Increase' onClick={() => setCurrentSize(currentSize + 1)}>+</span>

        </div>
    )
}

export default FontSize