import React, { useEffect, useRef, useState } from 'react'
import style from './table.module.scss';
import Tags from "../Tags/Tags"
import Owner from '../Owner/Owner';
import { useTabContext } from '../../Context/TabContext';

let isClickedObject;
const RenderTable = ({ item, click, setTableData, tableList, folderData }) => {

    const [expanded, setExpanded] = useState(false);
    const [reRender, setRerender] = useState(true);
    const fileRef = useRef();

    const onDragStart = (e) => {
        // console.log('onDragStart', isClickedObject);
        e.dataTransfer.setData("Text",JSON.stringify(isClickedObject));
    }

    const getDropLocation = (event, data) => {
        const eventWrapper = event;
        if (eventWrapper.id === 'wiki-file-list' && eventWrapper.parentNode?.id === 'wiki-container-list') {
            let dropData = {
                event: eventWrapper,
                type: 'file'
            }
            return dropData;
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
                if (arrData.id === getFolderId) {
                    arrData.items = [...arrData.items, data.item];
                } else if (arrData.id === data.item.id) {
                    tableDatas.splice(i, 1);
                    i -= 1;
                    length = tableDatas.length;
                }
            }
            return tableDatas;
        }
       let content = getDropLocation(eventWrapper.parentNode, data);
       return content;
    }
    
    const onDragDrop = (event) => {
        // console.log('onDragDrop', event)
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
            <div className={style['table-list-items-folder']} id={`wiki-folder-list${item.id}`} onDragEnter={onDragEnter} onDrop={onDragDrop} onDragOver={onDragEnter}>
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
    else return <div className={style['table-list-items-files']} id='wiki-file-list' draggable onDragStart={onDragStart} onDragOver={onDragEnter} onDragEnter={onDragEnter} onDrop={onDragDrop} onMouseDown={() => {getTabelItem()}}>
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
const Table = ({ tableData, setData }) => {

    const [tableList, setTableList] = useState(tableData ? tableData : []);

    const { handleTabAddBtn,
        setOpenBlogTab
    } = useTabContext()

    const click = (name, id, item) => {
        setOpenBlogTab(true)
        handleTabAddBtn(name, id, item, true)
    }

    const updateDateDatas = (data) => {
        setTableList(data);
        setData(data)
    }
    

    return (
        <div className={style['table-parent-wrapper']}>
            <div className={style['table-header']}>
                <span>Documents</span>
                <span>Tags</span>
                <span>Owner</span>
                <div className={style['table-header-modified']}>
                    <span>Modified </span>
                    <span className={style['modified-down-arrow']}></span>
                </div>
                <span className={style['table-header-action']}>Actions</span>
            </div>
            <div className={style['table-list-items-wrapper']} id='wiki-container-list'>
                {
                    tableList.map(item => (
                        <RenderTable key={Math.floor(Math.random() * 100)} item={item} click={click} setTableData={updateDateDatas} tableList={tableList}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Table



