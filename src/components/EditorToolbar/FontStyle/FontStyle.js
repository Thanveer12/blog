import React from 'react'
import style from './style.module.scss'
const FontStyle = ({handleStyle}) => {
  return (
    <div className={style['font-style-parent-wrapper']}>
      <button type="button" className={style.bold} title='Bold' onClick={(e) => handleStyle(e, 'bold')}/>
      <button type="button" className={style.italic} title='Italic' onClick={(e) => handleStyle(e, 'italic')}/>
      <button type="button" className={style.underline} title='Underline' onClick={(e) => handleStyle(e, 'underline')}/>
      <button type="button" className={style.strikethrough} title='StrikeThrough' onClick={(e) => handleStyle(e, 'strike')}/>
    </div>
  )
}

export default FontStyle