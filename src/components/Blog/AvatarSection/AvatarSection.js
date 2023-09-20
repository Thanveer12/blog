import React from 'react'
import Avatar from '../../Avatar/Avatar'
import style from './avatarSection.module.scss'
const AvatarSection = ({user}) => {
    return (
        <div className={style['avatar-section-parent-wrappper']}>
            <Avatar
                imgSrc={user.cover_img_url}
                    firstName={user.first_name ? user.first_name : ""}
                    lastName={user.last_name}
                    alt={`${user.first_name}'s pic`}
                height={35}
                width={35}
                fontSize={15}
                borderRadius='3px'
            />
            <div className={style['avatar-section-name-date-wrapper']}>
                <span id={style['avatar-section-name']}>{user.first_name + " " + user.last_name} </span>
                <span id={style['avatar-section-date']}>Tuesday, Jul 12, 2023</span>
            </div>
        </div>
    )
}

export default AvatarSection