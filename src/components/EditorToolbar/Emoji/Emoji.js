import React from 'react'
import style from'./style.module.scss'
const Emoji = () => {
  return (
<div className={style['emoji-button-parent-wrapper']}>
    <button type='button' className={style['emoji-button']} title='Add Emoji'/>
    </div>
  )
}

export default Emoji