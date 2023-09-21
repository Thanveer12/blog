import React from 'react'
import style from './styles.module.scss';

import Emoji from './Emoji/Emoji';
import FontOptions from './FontOptions/FontOptions';
import FontStyle from './FontStyle/FontStyle'
import List from './List/List'
import Picture from './Picture/Picture'
import TextAlignment from './TextAlignment/TextAlignment'
import UndoRedo from './UndoRedo/UndoRedo'
import UrlButton from './UrlButton/UrlButton'


const EditorToolBar = ({ activeEditorRef, alignment, activeState, fontSize, setFontSize, innerEditorRef }) => {

    const handleToolbarOptions = (e, type, value) => {

        switch (type) {
            case 'bold':
            case 'italic':
                activeEditorRef?.current.toggleStyle(e, type);
                break;

            case 'orderedlist':
            case 'unorderedlist':
                innerEditorRef?.current.focus();
                activeEditorRef?.current.toggleList(e, value);
                break;

            case 'alignment':
                if (alignment) alignment(value);
                break;

            case 'underline':
            case 'strike':
                activeEditorRef?.current?.handleTextDecoration?.(e, type);
                break;

            case 'color':
                activeEditorRef?.current?.setTheColorForSelectedText(value);
                break;

            case 'hyperlink':
                activeEditorRef?.current?.showDialogueBoxAtCursor(e);
                break;

            default:
                // Handle the case when 'type' doesn't match.
                break;
        }
    }


    return (
        <div className={style['editor-options-parent-wrapper']}>

            <div className={style['editor-left-options']}>
                <UndoRedo />
                <span className={style.separator}>|</span>
                <FontOptions
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    handleColor={handleToolbarOptions}
                />
                <span className={style.separator}>|</span>
                <FontStyle handleStyle={handleToolbarOptions} />
                <span className={style.separator}>|</span>

                {activeState !== 'title' && <>
                    <TextAlignment alignment={handleToolbarOptions} />
                    <span className={style.separator}>|</span>
                    <List handleList={handleToolbarOptions} />
                    <span className={style.separator}>|</span>
                    <UrlButton handleLink={handleToolbarOptions} />
                    <Picture />
                </>}
                <Emoji />
            </div>
            <div className={style['editor-right-options']}>
                <div>Folder Selector</div>
                <button className={style['share-button']} title='Share' type='button' />
            </div>

        </div>
    )
}

export default EditorToolBar