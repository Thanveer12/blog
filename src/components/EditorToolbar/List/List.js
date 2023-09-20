import React from 'react'
import style from './style.module.scss'
const List = ({handleList}) => {
  return (
    <div className={style['list-order-parent-wrapper']}>
      <button type='button' className={style['numbered-list']} tabIndex={-1} title='Numbered List' onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleList(e, 'orderedlist', 'ol')
        
        }}/>
      <button type='button' className={style['unordered-list']} tabIndex={-1} title='Unordered List' onClick={(e) =>{
        e.stopPropagation();
        e.preventDefault();
         handleList(e, 'unorderedlist', 'ul')}}/>
    </div>
  )
}

export default List