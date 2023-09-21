import React from "react"
import ClickOutSideListener from "../ClickOutSideListener";
import FolderSetting from "../FolderSetting/FolderSetting";
import style from './Filter.module.scss';
import { useFilterContext } from "../../Context/FilterContext";
const Filter = () => {

    const {
        enableListMode,
        tabFilter, setOpenSearchBox,
        openSearchBox,
        setOpenSettingOption,
        handleModeChange,
        getFilterData,
        openSettingOption,
        setOpenFolderSettingPane,
        openFolderSettingPane

    } = useFilterContext()

    return (
        <div className={style["wiki-filter-container"]}>

            <button className={enableListMode ? style['wiki-list-mode'] : style['wiki-grid-mode']} onClick={handleModeChange}></button>
            <div className={style["wiki-filter-tab"]}>
                <button className={`${style["wiki-button"]}  ${tabFilter.owner ? style['wiki-tab-select'] : ''}`} onClick={() => getFilterData('ownerFiles')}>My Files</button>
                <button className={`${style["wiki-button"]}  ${style["wiki-shared-filter"]} ${(tabFilter.shared ? style['wiki-tab-select'] : '')}`} onClick={() => getFilterData('sharedFiles')}>Shared with me</button>
            </div>

            <button className={`${style["wiki-bin-filter"]}  ${style["wiki-button"]}`}>bin</button>
            <button className={style["wiki-icon-search"]} onClick={(e) => {
                e.stopPropagation();
                setOpenSearchBox(prev => !prev)
            }}></button>
            {openSearchBox && <input type={'text'} placeholder='search' className={style["wiki-global-search"]} />}

            <div className={style["wiki-setting"]}>
                <ClickOutSideListener onOutsideClick={() => setOpenSettingOption(false)}>
                    <button className={style["wiki-icon-setting"]} onClick={() => setOpenSettingOption(prev => !prev)}></button>
                </ClickOutSideListener>
                {openSettingOption &&
                    <div className={style["wiki-option"]}>
                        <span className={style["wiki-setting-option"]} onClick={(e) => {
                            e.stopPropagation();
                            setOpenSettingOption(prev => !prev)
                            setOpenFolderSettingPane(true)
                        }}>Manage Folder</span>
                    </div>}
                {openFolderSettingPane &&
                    <ClickOutSideListener onOutsideClick={() => { setOpenFolderSettingPane(false) }}>
                        <FolderSetting />
                    </ClickOutSideListener>}
            </div>

        </div>
    )
}

export default Filter;