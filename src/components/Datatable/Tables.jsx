import React, { useEffect, useRef, useState } from 'react'
import style from './table.module.scss';
import Tags from "../Tags/Tags"
import Owner from '../Owner/Owner';
import { useTabContext } from '../../Context/TabContext';
import { random } from 'lodash';
import RenderTable from './RenderTables';

const Tables = ({ tableData, setData }) => {

    const [tableList, setTableList] = useState(tableData ? tableData : []);

    const { handleTabAddBtn,
        setOpenBlogTab
    } = useTabContext()

    const click = (name, id, item) => {
        setOpenBlogTab(true)
        handleTabAddBtn(name, id, item, true)
    }

    const updateDateDatas = (data) => {
        setTableList(data);
        setData(data)
    }
    

    return (
        <div className={style['table-parent-wrapper']}>
            <div className={style['table-header']}>
                <span>Documents</span>
                <span>Tags</span>
                <span>Owner</span>
                <div className={style['table-header-modified']}>
                    <span>Modified </span>
                    <span className={style['modified-down-arrow']}></span>
                </div>
                <span className={style['table-header-action']}>Actions</span>
            </div>
            <div className={style['table-list-items-wrapper']} id='wiki-container-list'>
                {
                    tableList.map(item => (
                        <RenderTable key={Math.floor(Math.random() * 100)} item={item} click={click} setTableData={updateDateDatas} tableList={tableList}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Tables