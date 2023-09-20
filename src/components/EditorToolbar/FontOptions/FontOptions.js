import React from 'react';
import style from './style.module.scss';
import FontFamilySelector from './FontFamilySelector/FontFamilySelector';
import FontSize from './FontSize/FontSize';
import FontColor from './FontColor/FontColor';



const FontOptions = ({ fontSize, setFontSize, handleColor }) => {
  return (
    <div className={style['font-options-parent-wrapper']}>
      <FontFamilySelector />
      <FontSize currentSize={fontSize} setCurrentSize={setFontSize} />
      <FontColor handleColor={handleColor} />
    </div>
  )
}

export default FontOptions