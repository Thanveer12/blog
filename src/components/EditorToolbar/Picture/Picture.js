import React from 'react'
import style from './style.module.scss'

const Picture = () => {
  return (
    <div className={style['picture-button-parent-wrapper']}>
    <button type='button' className={style['picture-button']} title='Add Picture'/>
    </div>
  )
}

export default Picture