import React from 'react'
import style from './style.module.scss'

const Tags = ({ tags=[] }) => {

    let metaTagList = []
    tags.forEach((i, index) => {
        if (i.name) metaTagList.push(<span key={index} id={style.action1}>{i.name}</span>)
    }
    )
    return metaTagList;
}

export default Tags