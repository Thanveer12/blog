import React from 'react';
import style from './style.module.scss';
import { useTabContext } from '../../Context/TabContext';

const ArticleTypeOption = () => {

    const { setIsVideoArticle,setOpenArticleTypeMenuDropdown,openEditorTab } = useTabContext()
    return (
        <div className={style['article-type-option']}>
            <div className={style['dropdown-menu']} onClick={() =>{ setIsVideoArticle(false);setOpenArticleTypeMenuDropdown(false); openEditorTab()}}>
                <span className={`${style['file-icon']} ${style['article']}`} />
                <span>Article</span>
            </div>
            <div className={style['dropdown-menu']} onClick={() =>{ setIsVideoArticle(true);setOpenArticleTypeMenuDropdown(false);openEditorTab()}}>
                <span className={`${style['file-icon']} ${style['video']}`} />
                <span>Video</span>
            </div>
        </div>

    )
}

export default ArticleTypeOption