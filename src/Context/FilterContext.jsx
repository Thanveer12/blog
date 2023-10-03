import { createContext, useContext, useState } from "react";

const FiltersContext = createContext();

export const useFilterContext = () => {
    return useContext(FiltersContext)
}
export const FilterContext = ({ children }) => {

    const [enableListMode, setEnableListMode] = useState(true);
    const [tabFilter, setTabFilter] = useState({ owner: false, shared: false });
    const [openFolderSettingPane, setOpenFolderSettingPane] = useState(false);
    const [openSettingOption, setOpenSettingOption] = useState(false);
    const [openSearchBox, setOpenSearchBox] = useState(false)
    const [reRender, setRerender] = useState(true);

    const handleModeChange = () => {
        setEnableListMode(prev => !prev)
    }

    const getFilterData = (type) => {
        if (type === 'ownerFiles') {
            setTabFilter({ ...tabFilter, owner: !(tabFilter.owner) })
        } else if (type === 'sharedFiles') {
            setTabFilter({ ...tabFilter, shared: !(tabFilter.shared) })
        }
    }


    return (<FiltersContext.Provider value={{
        enableListMode, setEnableListMode,
        tabFilter, setTabFilter,
        openFolderSettingPane, setOpenFolderSettingPane,
        openSettingOption, setOpenSettingOption,
        openSearchBox, setOpenSearchBox,
        handleModeChange,
        getFilterData,
        reRender,
        setRerender
    }}>
        {children}
    </FiltersContext.Provider>)
}

