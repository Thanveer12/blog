import React, { useState } from 'react'
import './table.scss';
import Tags from "../Tags/Tags"
import Owner from '../Owner/Owner';
import { useTabContext } from '../../Context/TabContext';

const RenderTable = ({ item, click }) => {
    const [expanded, setExpanded] = useState(false);
    if (item.isFolder) {
        return (
            <div className='table-list-items-folder'>
                <div className='table-folder-header'>
                    <span className='folder-wrapper-name' onClick={() => setExpanded(!expanded)}>
                        <span className={expanded ? 'arrow-down-icon' : 'arrow-icon'} />
                        <span className='file-icon' />
                        <span className='file-name'> {item.name}</span>
                    </span>
                    <div className='metaTags-wrapper'></div>

                    <div className='owner-wrapper'>
                        <Owner ownerData={item.owner} />
                    </div>

                    <div className='modified-wrapper'>July 23, 2023 &middot; 09:18 AM</div>
                    <div className='action-wrapper'></div>
                </div>


                <div className='table-folder-wrapper' style={{ display: expanded ? 'block' : 'none' }}>  {
                    item.items.map((subItem) => {
                        return <RenderTable item={subItem} key={subItem.id} click={click} />
                    })
                }
                </div>
            </div>
        )
    }
    else return <div className='table-list-items-files' onClick={() => click(item.name, item.id, item)}>
        <span className='name-icon-wrapper'>
            <span className='file-icon'></span>
            <span className='file-name'>{item.name}</span>
        </span>
        <span className='metaTags-wrapper'>{
            <Tags tags={item.tags} />
        }</span>
        <span className='owner-wrapper'>
            <Owner ownerData={item.owner} />
        </span>
        <span className='modified-wrapper'>July 23, 2023 &middot; 09:18 AM</span>
        <span className='action-wrapper'>actions</span>
    </div>

}
const Table = ({ tableData }) => {

    const { tabsInfo, setTabsInfo, handleTabAddBtn, handleTabRemove, handleTabOpen, handleTabsOrderChange } = useTabContext()
    const click = (name, id, item) => {
        handleTabAddBtn(name, id, item)
    }

    return (
        <div className='table-parent-wrapper'>
            <div className='table-header'>
                <span>Documents</span>
                <span>Tags</span>
                <span>Owner</span>
                <div className='table-header-modified'>
                <span>Modified </span>
                <span className='modified-down-arrow'></span>
                </div>
                <span>Actions</span>
            </div>
            <div className='table-list-items-wrapper'>
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



