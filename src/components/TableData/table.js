import React, { useState } from 'react'
import { useTabContext } from '../../Context/TabContext';
import './table.scss';
// import Tags from "../Tags/Tags"
// import Owner from '../Owner/Owner';

const RenderTable = ({ item, click }) => {
    const [expanded, setExpanded] = useState(false);
    if (item.isFolder) {
        return (
            <div className='table-list-items-folder'>
                <div className='folder-wrapper-name' onClick={() => setExpanded(!expanded)}>
                    <span>📂 {item.name}</span>
                </div>


                <div className='table-folder-wrapper' style={{ display: expanded ? 'block' : 'none' }}>  {
                    item.items.map((subItem) => {
                        return <RenderTable item={subItem} key={subItem.id} click={click}/>
                    })
                }
                </div>
            </div>
        )
    }
    else return <div className='table-list-items-files' onClick={() => click(item.name, item.id, item)}>
        <span>🗃️ {item.name}</span>
        
        <span>July 23, 2023 * 09:18 AM</span>
        <span>actions</span>
    </div>

}
const Table = ({ tableData }) => {
    const { tabsInfo, setTabsInfo, handleTabAddBtn, handleTabRemove, handleTabOpen, handleTabsOrderChange, setGetBloData } = useTabContext()
    const click = (name, id, item) => {
        setGetBloData(item)
        handleTabAddBtn(name, id, item)
    }

    return (
        <div className='table-parent-wrapper'>
            <div className='table-header'>
                <span>Documents</span>
                <span>Tags</span>
                <span>Owner</span>
                <span>Modified</span>
                <span>Actions</span>
            </div>
            <div className='table-list-items-wrapper'>
                {
                    tableData.map(item => (
                        <RenderTable key={item.id} item={item} click={click}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Table



