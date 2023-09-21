import React from 'react';
import style from './Owner.module.scss';
import Avatar from "../Avatar/Avatar";

const Owner = ({ ownerData }) => {
    return (
        <div className={style['owner-avatar-name-wrapper']}>
            <Avatar
                imgSrc={ownerData.cover_img_url}
                firstName={ownerData.first_name ? ownerData.first_name : ""}
                lastName={ownerData.last_name}
                alt={`${ownerData.first_name}'s pic`}
                height={16}
                width={16}
                fontSize={9}
                borderRadius='2px' />

            {ownerData.first_name ? <span className={style['owner-name']}>{ownerData.first_name} {ownerData.last_name}</span> : ''}
        </div>
    )
}

export default Owner