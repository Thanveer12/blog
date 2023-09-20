import React from 'react'
import style from './style.module.scss'
const TextAlignment = ({alignment}) => {
  return (
    <div className={style['text-alignment-parent-wrapper']}>
      <button type="button" className={style['align-left']} title='Align Left' onClick={(e) => alignment(e, 'alignment', 'left')}/>
      <button type="button" className={style['align-center']} title='Center' onClick={(e) => alignment(e, 'alignment', 'center')}/>
      <button type="button" className={style['align-right']} title='Align Right' onClick={(e) => alignment(e, 'alignment', 'right')}/>
      <button type="button" className={style['align-justify']} title='Justify' onClick={(e) => alignment(e, 'alignment', 'justify')}/>
    </div>
  )
}

export default TextAlignment