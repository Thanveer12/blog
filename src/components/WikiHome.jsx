import React from "react";
import BlogCreator from "./BlogCreator/BlogCreator";
import { useTabContext } from "../Context/TabContext";
import Table from "./Datatable/table";
import explorer from "./Datatable/tableData";
import Tabs from "./Tabs/Tabs";
import Filter from "./WikiFilter/Filter";
import './WikiHome.scss';

const WikiHome = () => {
    const { tabsInfo, setTabsInfo, handleTabAddBtn, handleTabRemove, handleTabOpen, handleTabsOrderChange } = useTabContext()

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
                    showAddBtn={true}
                    showEditBtn={true}
                    backgroundColor={'transparent'}
                    homeIcon={'wiki'}
                />
            </div>
            {/* <Filter />
            <Table tableData={explorer}/> */}
            <BlogCreator />
        </>
    )
}

export default WikiHome;