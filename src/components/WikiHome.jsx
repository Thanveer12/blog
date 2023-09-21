import React from "react";
import BlogCreator from "./BlogCreator/BlogCreator";
import { useTabContext } from "../Context/TabContext";
import Table from "./Datatable/table";
import explorer from "./Datatable/tableData";
import Tabs from "./Tabs/Tabs";
import Filter from "./WikiFilter/Filter";
import Blog from './Blog/Blog'
import './WikiHome.scss';

const WikiHome = () => {
    const { tabsInfo, handleTabAddBtn, handleTabRemove, handleTabOpen, handleTabsOrderChange, openBlogEditorTab
        , openBlogTab } = useTabContext()

    return (
        <>
            <div className="wiki-app-sub-header">
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
                />
            </div>
            {(tabsInfo.activeTabId === 'home' || openBlogTab) && <div className="wiki-content-parent-wrapper">
                {tabsInfo.activeTabId === 'home' &&
                    <>
                        <Filter />
                        <Table tableData={explorer} />
                    </>
                }
                {openBlogTab && <Blog blogData={explorer[0]} />}

            </div>}
            {openBlogEditorTab && <BlogCreator />}
        </>
    )
}

export default WikiHome;