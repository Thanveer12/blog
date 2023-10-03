import React, { useState } from "react";
import BlogCreator from "./BlogCreator/BlogCreator";
import { useTabContext } from "../Context/TabContext";
import Table from "./Datatable/table";
import { explorer } from "./Datatable/tableData";
import Tabs from "./Tabs/Tabs";
import Filter from "./WikiFilter/Filter";
import Blog from './Blog/Blog'
import style from './WikiHome.module.scss';
import Tabview from "./tabview/tabview";
import { useFilterContext } from "../Context/FilterContext";
import Tables from "./Datatable/Tables";

const WikiHome = () => {
    const { tabsInfo, handleTabAddBtn, handleTabRemove, handleTabOpen, handleTabsOrderChange,
        openBlogEditorTab,
        openBlogTab, handleTabEdit } = useTabContext();
    const { enableListMode } = useFilterContext();
    const [data, setData] = useState(explorer)

    return (
        <>
            <div className={style["wiki-app-sub-header"]}>
                <Tabs tabs={tabsInfo.tabs}   // state variable
                    activeTabId={tabsInfo.activeTabId}
                    onOpen={handleTabOpen}
                    onRemove={handleTabRemove}
                    onTabsOrderChange={handleTabsOrderChange}
                    onTabAddBtn={() => handleTabAddBtn(0)}
                    showAvatar={false}
                    showAddBtn={!openBlogEditorTab}
                    showEditBtn={true}
                    backgroundColor={'transparent'}
                    homeIcon={'wiki'}
                    onEdit={handleTabEdit}
                    onPublish={handleTabEdit}
                />
            </div>
            {(tabsInfo.activeTabId === 'home' || openBlogTab) &&

                <div className={style["wiki-content-parent-wrapper"]}>
                    {tabsInfo.activeTabId === 'home' &&
                        <>
                            <Filter />
                            {enableListMode ? <Tables tableData={data} setData={setData} /> :
                                <div className={style["tab-view"]}><Tabview tableData={explorer} /></div>}
                        </>
                    }
                    {openBlogTab && <Blog blogData={explorer[0]} />}

                </div>}
            {openBlogEditorTab && <BlogCreator />}
        </>
    )
}

export default WikiHome;