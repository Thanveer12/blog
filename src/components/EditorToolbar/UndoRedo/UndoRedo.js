import React from 'react'
import { useTabContext } from '../../../Context/TabContext'
import style from './style.module.scss'
const UndoRedo = () => {
  const { setTitle, setDescription, redoHistory, setRedoHistory, undoHistory, setUndoHistory } = useTabContext();

  const undoAction = () => {
    let lastElement = undoHistory.pop();
    let lastSecondElement = undoHistory.length > 0 ? undoHistory[undoHistory.length - 1] : ''
    redoHistory.push(lastElement);
    setTitle(undoHistory.length === 0 ? '' : lastSecondElement?.history?.title);
    setDescription(undoHistory.length === 0 ? '' : lastSecondElement?.history?.description);
  }

  const redoAction = () => {
    let lastElement = redoHistory.pop();
    undoHistory.push(lastElement);
    setTitle(lastElement?.history?.title);
    setDescription(lastElement?.history?.description);
  }

  return (
    <div className={style['undo-redo-parent-wrapper']}>
      <button type='button' className={style.redo} title='Redo' disabled={redoHistory?.length === 0} onClick={redoAction} />
      <button type='button' className={style.undo} title='Undo' disabled={undoHistory.length === 0} onClick={undoAction} />
    </div>
  )
}

export default UndoRedo