import React from "react";
import { TabContext } from "./Context/TabContext";
import WikiHome from "./WikiHome";

const Main = () => {

    return (
        <>
        <TabContext>
           <WikiHome />
        </TabContext>

        </>
    )
}

export default Main;