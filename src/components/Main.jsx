import React from "react";
import { TabContext } from "../Context/TabContext";
import { FilterContext } from "../Context/FilterContext";
import WikiHome from "./WikiHome";

const Main = () => {

    return (
        <>
            <TabContext>
                <FilterContext>
                    <WikiHome />
                </FilterContext>
            </TabContext>
        </>
    )
}

export default Main;