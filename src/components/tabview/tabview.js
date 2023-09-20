import React from 'react'
import Tags from '../Tags/Tags'
import CardQueue from '../CardQueue/CardQueue'
import style from './tabview.module.scss'


const Card = ({ item, setCurrentData, setShowBlog }) => {


  return (
    <div className={style['card-parent-wrapper']} onClick={item.isFolder ? () => { } : (e) => { e.stopPropagation(); setCurrentData(item); setShowBlog(true) }}>

      <div className={style['card-header-content-wrapper']}>

        <div className={style['card-header-wrapper']}>

          <span className={`${item.isFolder ? style['folder-icon'] : style['file-icon']}`}></span>
          <div className={style['card-header-three-dots']}>...</div>
        </div>

        <div className={style['card-content-wrapper']}>
          <div className={style['card-heading']}>{item.name}</div>


          {!item.isFolder ?
            <><div className={style['card-body']}>Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
              <div className={style['card-tags-wrapper']}>
                <Tags tags={item.tags} />
              </div></> :

            <div className={style['folder-cover-wrapper']}>
              <span className={style['folder-icon']} />
              <span>{item.items.length} {item.items.length > 1 ? 'files' : 'file'}</span>
            </div>}


        </div>
      </div>
      <div className={style['card-footer-wrapper']}>
        <CardQueue item={item.isFolder ? [item.owner] : item.shared_with} />
        <div>Monday, Jul 11, 2023</div>
      </div>

    </div>
  )
}
const Tabview = ({ tableData, setCurrentData, setShowBlog }) => {
  return <>
    {
      tableData.map(item => (<Card key={item.id}
        item={item}
        setCurrentData={setCurrentData}
        setShowBlog={setShowBlog} />))
    }
  </>
}

export default Tabview