import React, { useState } from 'react'
import style from './table.module.scss';
import Tags from "../Tags/Tags"
import Owner from '../Owner/Owner';
import { useTabContext } from '../../Context/TabContext';

const RenderTable = ({ item, click }) => {

    const [expanded, setExpanded] = useState(false);

  
    if (item.isFolder) {
        return (
            <div className={style['table-list-items-folder']}>
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
                        return <RenderTable item={subItem} key={subItem.id} click={click} />
                    })
                }
                </div>
            </div>
        )
    }
    else return <div className={style['table-list-items-files']}>
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
const Table = ({ tableData }) => {

    const { handleTabAddBtn,
        setOpenBlogTab
    } = useTabContext()

    const click = (name, id, item) => {
        setOpenBlogTab(true)
        handleTabAddBtn(name, id, item)
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
            <div className={style['table-list-items-wrapper']}>
                {
                    tableData.map(item => (
                        <RenderTable key={item.id} item={item} click={click} />
                    ))
                }
            </div>
        </div>
    )
}

export default Table



