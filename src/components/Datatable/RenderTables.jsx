import React, { useEffect, useRef, useState } from 'react'
import style from './table.module.scss';
import Tags from "../Tags/Tags"
import Owner from '../Owner/Owner';
import { useTabContext } from '../../Context/TabContext';
import { random } from 'lodash';
import { useFilterContext } from '../../Context/FilterContext';

let isClickedObject;
const RenderTable = ({ item, click, setTableData, tableList, folderData }) => {

    const [expanded, setExpanded] = useState(false);
    const {setRerender} = useFilterContext();
    
    const fileRef = useRef();

    const onDragStart = (e) => {
        // console.log('onDragStart', isClickedObject);
        e.dataTransfer.setData("Text",JSON.stringify(isClickedObject));
    }

    const removeDuplicateEntry = (data) => {
        const jsonObject = data.map(JSON.stringify);
        const uniqueUserSet = new Set(jsonObject);
        const uniqueUser = Array.from(uniqueUserSet).map(JSON.parse);
        return uniqueUser;
    }

    const getDropLocation = (event, data) => {
        const eventWrapper = event;
        if (eventWrapper.id === 'wiki-file-list' && eventWrapper.parentNode?.id === 'wiki-container-list') {
            let tableDatas = tableList;
            tableDatas.push(data.item);
            return tableDatas;
        } else if (eventWrapper.id?.includes('wiki-folder-list') && eventWrapper.parentNode?.id === 'wiki-container-list') {
            let dropData = {
                event: eventWrapper,
                type: 'folder'
            }
            let getFolderId = eventWrapper.id.replace('wiki-folder-list', '');
            let tableDatas = tableList;

            let length = tableDatas.length;
            for (let i = 0; i < length; i++) {
                let arrData = tableDatas[i];
                if (arrData.id === data.item.id) {
                    tableDatas.splice(i, 1);
                    i -= 1;
                    length = tableDatas.length;
                } else if (arrData.id === getFolderId) {
                    // arrData.items 
                    tableDatas[i].items= [...arrData.items, data.item];
                    debugger
                    tableDatas[i].items = removeDuplicateEntry(tableDatas[i].items)
                }
            }
            return tableDatas;
        }
       let content = getDropLocation(eventWrapper.parentNode, data);
       return content;
    }
    
    const onDragDrop = (event) => {
        // console.log('onDragDrop', event)
        debugger
        event.preventDefault();
        let data = event.dataTransfer.getData("Text");
        data = JSON.parse(data);
        const isDropInsideFolder = getDropLocation(event.target, data);
        setTableData(isDropInsideFolder);
        setRerender(prev => !prev)
        console.log('onDragDrop', data);
    }
    
    const onDragEnter = (event) => {
        event.preventDefault();
        // console.log('onDragEnter', event)
    }

    const getTabelItem = () => {
        isClickedObject = {
            item: item,
            folderId: folderData?.id,
            isFolder: folderData ? true : false
        }
    }
  
    if (item.isFolder) {
        return (
            <div className={style['table-list-items-folder']} id={`wiki-folder-list${item.id}`} onDrop={onDragDrop} onDragOver={onDragEnter}>
                <div className={style['table-folder-header']}>
                    <span className={style['folder-wrapper-name']} onClick={() => setExpanded(!expanded)}>
                        <span className={expanded ? style['arrow-down-icon'] : style['arrow-icon']} />
                        <span className={style['file-icon']} />
                        <span className={style['file-name']}> {item.name}</span>
                    </span>
                    <div className={style['metaTags-wrapper']}></div>

                    <div className={style['owner-wrapper']}>
                        <Owner ownerData={item.owner} />
                    </div>

                    <div className={style['modified-wrapper']}>July 23, 2023 &middot; 09:18 AM</div>
                    <div className={`${style['folder-action-wrapper']} ${style['action-wrapper']}`}>
                        <span className={`${style['setting-icon']}  ${style['action-icon']}`}></span>
                        <span className={`${style['archive-icon']}  ${style['action-icon']}`}></span>
                        <span className={`${style['delete-icon']}  ${style['action-icon']}`}></span>
                    </div>
                </div>


                <div className={style['table-folder-wrapper']} style={{ display: expanded ? 'block' : 'none' }}>  {
                    item.items.map((subItem) => {
                        return <RenderTable item={subItem} key={Math.floor(Math.random() * 100)} click={click} folderData={item} setTableData={setTableData} tableList={tableList}/>
                    })
                }
                </div>
            </div>
        )
    }
    else return <div className={style['table-list-items-files']} id='wiki-file-list' draggable onDragStart={onDragStart} onDragOver={onDragEnter} onDrop={onDragDrop} onMouseDown={() => {getTabelItem()}}>
        <span className={style['name-icon-wrapper']} onClick={() => click(item.name, item.id, item)}>
            <span className={style['file-icon']}></span>
            <span className={style['file-name']}>{item.name}</span>
        </span>
        <span className={style['metaTags-wrapper']}>{
            <Tags tags={item.tags} />
        }</span>
        <span className={style['owner-wrapper']}>
            <Owner ownerData={item.owner} />
        </span>
        <span className={style['modified-wrapper']}>July 23, 2023 &middot; 09:18 AM</span>
        <span className={style['action-wrapper']}>
            <span className={`${style['share-icon']}  ${style['action-icon']}`}></span>
            <span className={`${style['edit-icon']}  ${style['action-icon']}`}></span>
            <span className={`${style['archive-icon']}  ${style['action-icon']}`}></span>
            <span className={`${style['delete-icon']}  ${style['action-icon']}`}></span>

        </span>
    </div>

}

export default RenderTable;