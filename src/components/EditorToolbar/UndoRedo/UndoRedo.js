import React from 'react'
import style from './style.module.scss'
const UndoRedo = () => {
  return (
    <div className={style['undo-redo-parent-wrapper']}>
      <button type='button' className={style.redo} title='Redo'/>
      <button type='button' className={style.undo} title='Undo'/>
    </div>
  )
}

export default UndoRedo