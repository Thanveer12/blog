import { createContext, useContext, useState, useEffect, useRef } from "react"

const TabsContext = createContext();

export const useTabContext = () => {

    return useContext(TabsContext);

}

export const TabContext = ({ children }) => {

    const currentTabId = useRef();

    const [openBlogEditorTab, setOpenBlogEditorTab] = useState(false);
    const [openBlogTab, setOpenBlogTab] = useState(false);
    const [getBlogData, setBlogData] = useState('');
    const [editMode, setEditMode] = useState(false);

    // ! move below states to a new context
    const [undoHistory, setUndoHistory] = useState([]);
    const [redoHistory, setRedoHistory] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const [tabsInfo, setTabsInfo] = useState({
        tabs: [
            { id: 'home', name: 'home' },
        ],
        activeTabId: 'home', // stores the id of currently opened tab
        newTabCounter: 1, // to name the tabs when more than one tab is being added
    });

    const handleTabEdit = (tab) => {
        const allTabData = {...tabsInfo}
        allTabData?.tabs?.forEach((tabs) => {
            if (+tabs.id === +tab) {
                tabs.editMode = !tabs.editMode;
                setEditMode(tabs.editMode)
            }
        })
        setTabsInfo(allTabData);

        console.log(allTabData)
        console.log(tab);
    }

    async function handleTabOpen(tabId) {

        if (tabId.toString() !== tabsInfo.activeTabId) {

            // Do not execute the function if active tab is clicked again
            if (tabId === 'home') {
                if (openBlogEditorTab) setOpenBlogEditorTab(false)
                if (openBlogTab) setOpenBlogTab(false)

            }
            else {
                setOpenBlogTab(true)
                currentTabId.current = +tabId;
                // if (tabsInfo && !tabsInfo.tabs.filter(item => +item.id === currentTabId.current).length)
                // AddOrRemoveTab(+tabId, true)
            }

            let updatedTabsInfo = {
                ...tabsInfo,
                activeTabId: tabId.toString(),
                tabs: tabsInfo.tabs.map(t => t.id !== tabId ? t : { ...t })
            }

            setTabsInfo(updatedTabsInfo);

            // props.history.push('/supportcenter/t-' + tabId);
        }
    }

    function handleTabRemove(tabId) {
        // clean up: removes tab information from tabsInfo state var and redirects to home tab
        let currentActiveTabid = '';

        // ! check for closig editor tab also
        setOpenBlogTab(false)

        if (openBlogEditorTab) setOpenBlogEditorTab(false)
        const tabsLengthExcludingHomeTab = tabsInfo.tabs.length - 1;

        const currentTabIndex = tabsInfo.tabs.findIndex(item => +item.id === +tabId)

        if (+tabsInfo.activeTabId !== +tabId) {
            currentActiveTabid = tabsInfo.activeTabId
        }
        else {
            if (currentTabIndex > -1) {
                if (currentTabIndex + 1 <= tabsLengthExcludingHomeTab) {
                    currentActiveTabid = tabsInfo.tabs[currentTabIndex + 1].id.toString();
                }

                if (currentTabIndex + 1 > tabsLengthExcludingHomeTab) {
                    if (currentTabIndex - 1 < 1) {
                        currentActiveTabid = 'home';
                    }
                    else
                        currentActiveTabid = tabsInfo.tabs[currentTabIndex - 1].id.toString();
                }
            }
        }

        if (!currentTabIndex || currentTabIndex === -1) {
            currentActiveTabid = 'home';
        }

        let updatedTabsInfo = {
            ...tabsInfo,
            activeTabId: currentActiveTabid,
            tabs: tabsInfo.tabs.filter((t) => t.id !== tabId),
        };
        // tab.tab_topics.forEach((t, index) => {
        //     if (t.id === tabId) {
        //         tab.tab_topics.splice(index, 1);
        //         return;
        //     }
        // })
        // AddOrRemoveTab(parseInt(tabId), false);

        setTabsInfo(updatedTabsInfo);

        if (currentActiveTabid === 'home') {
            // getTopicsBasedOnFilter()
            // dispatch({ type: actionType.open_ticket_tab, payload: false })
            // props.history.push("/supportcenter/t-home");
        }
        if (currentActiveTabid !== 'home') {

            // dispatch({ type: actionType.open_ticket_tab, payload: true })

            // props.history.push(`/supportcenter/t-${currentActiveTabid}`);

            currentTabId.current = +currentActiveTabid;

        }
        // Remove funnel Data from Session storage on tab close
        // sessionStorage.removeItem(Constants.SITE_PREFIX + tabsInfo.activeTabId);

    }

    function handleTabsOrderChange(reorderTabs) {

        let updatedTabsInfo = { ...tabsInfo, tabs: reorderTabs }
        setTabsInfo(updatedTabsInfo);
    }

    function handleTabAddBtn(title, id, topics) {

        if (openBlogTab) setOpenBlogTab(false)

        setOpenBlogEditorTab(true)

        if (topics?.name.length > 40) {
            title += ` - ${topics?.name.substring(0, 40)} ...`;
        }
        else if (topics?.name.length <= 40) {
            title += ` - ${topics.name}`
        }

        if (topics) {

            // if (!retainedTabsData.length) {
            //     setSelectedPost(topics);
            //     setRetainedTabsData([topics]);
            // }

            // if (retainedTabsData.length > 0) {
            //     const existingIndex = retainedTabsData.findIndex(item => +item.id === +id)
            //     if (existingIndex === -1) {
            //         setSelectedPost(topics)
            //         setRetainedTabsData([...retainedTabsData, topics])
            //     }
            //     if (existingIndex > -1) {
            //         if (topics)
            //             setSelectedPost(topics)
            //         else
            //             setSelectedPost([retainedTabsData[existingIndex]])

            //     }
            // }
        }

        let updatedTabsInfo = {};
        let checkDuplication = false;

        tabsInfo.tabs.forEach((Tab) => {
            if (+Tab.id === id) {
                checkDuplication = true;
                return;
            }
        });
        if (!checkDuplication) {
            // AddOrRemoveTab(parseInt(id), true);
            if (title !== undefined && id) {
                updatedTabsInfo = {
                    activeTabId: id.toString(),
                    tabs: [
                        ...tabsInfo.tabs,
                        {
                            id: id.toString(),
                            name: title,
                            privileges: 'EDIT',
                            editMode: false
                        }
                    ],
                    newTabCounter: tabsInfo.newTabCounter + 1
                }
            } else {
                updatedTabsInfo = {
                    activeTabId: `new_article_${tabsInfo.newTabCounter}`,
                    tabs: [
                        ...tabsInfo.tabs,
                        {
                            id: `new_article_${tabsInfo.newTabCounter}`,
                            name: `New Article - ${tabsInfo.newTabCounter}`
                        }
                    ],
                    newTabCounter: tabsInfo.newTabCounter + 1
                }
            }
        } else {
            updatedTabsInfo = {
                activeTabId: id.toString(),
                tabs: [
                    ...tabsInfo.tabs
                ],
                newTabCounter: tabsInfo.newTabCounter
            }
        }
        // dispatch({ type: actionType.open_ticket_tab, payload: true })
        setTabsInfo(updatedTabsInfo);


        // props.history.push("/supportcenter/t-" + id);
    }


    // !
    return (
        <TabsContext.Provider
            value={{
                tabsInfo, setTabsInfo, handleTabAddBtn,
                handleTabsOrderChange, handleTabRemove, handleTabOpen,
                undoHistory, setUndoHistory, redoHistory, setRedoHistory,
                title, setTitle, description, setDescription,
                setOpenBlogEditorTab,
                setOpenBlogTab,
                openBlogEditorTab,
                openBlogTab,
                handleTabEdit,
                getBlogData,
                setBlogData,
                editMode
            }}
        >
            {children}
        </TabsContext.Provider>
    )
}