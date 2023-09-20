import React from 'react'
import style from './style.module.scss'
const UrlButton = ({handleLink}) => {
  return (
    <div className={style['url-button-parent-wrapper']}>
    <button type='button' className={style['url-button']} title='Add URL' onClick={(e) => handleLink(e, 'hyperlink')}/>
    </div>
  )
}

export default UrlButton