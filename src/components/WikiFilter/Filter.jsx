import React, { useState } from "react"
import ClickOutSideListener from "../ClickOutSideListener";
import FolderSetting from "../FolderSetting/FolderSetting";
import './Filter.scss';

const Filter = () => {
    const [enableListMode, setEnableListMode] = useState(true);
    const [tabFilter , setTabFilter] = useState({owner: false, shared: false});
    const [openFolderSettingPane, setOpenFolderSettingPane] = useState(false);
    const [openSettingOption, setOpenSettingOption] = useState(false);
    const [openSearchBox, setOpenSearchBox] = useState(false)

    const handleModeChange = () => {
        setEnableListMode(prev => !prev)
    }

    const getFilterData = (e, type) => {
        if (type === 'ownerFiles') {
            setTabFilter({...tabFilter, owner: !(tabFilter.owner)})
        } else if (type === 'sharedFiles') {
            setTabFilter({...tabFilter, shared: !(tabFilter.shared)})
        }
    }

    return (
        <div className="wiki-filter-container">

            <button className={enableListMode ? 'wiki-list-mode': 'wiki-grid-mode'} onClick={handleModeChange}></button>
            <div className="wiki-filter-tab">
                <button className={"wiki-button" + (tabFilter.owner ? ' wiki-tab-select': '')} onClick={(e) => getFilterData(e, 'ownerFiles')}>My Files</button>
                <button className={"wiki-button wiki-shared-filter" + (tabFilter.shared ? ' wiki-tab-select': '')} onClick={(e) => getFilterData(e, 'sharedFiles')}>Shared with me</button>
            </div>

            <button className="wiki-bin-filter wiki-button">bin</button>
            <button className="wiki-icon-search" onClick={(e) => {
                e.stopPropagation();
                setOpenSearchBox(prev => !prev)
            }}></button>
            {openSearchBox && <input type={'text'} placeholder='search' className="wiki-global-search"/>}

            <div className="wiki-setting">
                <ClickOutSideListener onOutsideClick={() => setOpenSettingOption(false)}>
                    <button className="wiki-icon-setting" onClick={() => setOpenSettingOption(prev => !prev)}></button>
                </ClickOutSideListener>
                {openSettingOption &&
                    <div className="wiki-option">
                            <span className="wiki-setting-option" onClick={(e) => {
                                e.stopPropagation();
                                setOpenSettingOption(prev => !prev)
                                setOpenFolderSettingPane(true)
                            }}>Manage Folder</span>
                </div>}
                {openFolderSettingPane && 
                    <ClickOutSideListener onOutsideClick={() => {setOpenFolderSettingPane(false)}}>
                        <FolderSetting/>
                    </ClickOutSideListener>}
            </div>

        </div>
    )
}

export default Filter;