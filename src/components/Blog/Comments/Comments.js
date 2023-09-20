import React, { useState } from 'react'
import Avatar from '../../Avatar/Avatar'
import style from './comments.module.scss'

const Comment = ({ user, commentList }) => {

    return (
        <div className={style['commen-avatar-user-content-wrapper']}>
            <Avatar
                imgSrc={user.cover_img_url}
                firstName={user.first_name ? user.first_name : ""}
                lastName={user.last_name}
                alt={`${user.first_name}'s pic`}
                height={25}
                width={25}
                fontSize={12}
                borderRadius='3px'
            />
            <div className={style['comment-user-content']}>
                <span id={style['comment-user-name']}>{user.first_name + " " +
                    user.last_name} <span>{'1h ago'}</span></span>
                <span id={style['comment-user-content']}>
                    {commentList.message}
                </span>
            </div>
        </div>
    )
}
const Comments = ({ commentData }) => {
    const [inputComment, setInputComment] = useState('')
    const [commentList, setCommentist] = useState([{message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}])
    const { owner } = commentData;

    const handleEnter = (e) => {
        if (+e.keyCode === 13) {
            setCommentist([...commentList, {
                message: inputComment
            }])

            setInputComment('')
        }
    }


    return (
        <div className={style['comments-parent-wrapper']}>
            <input value={inputComment} placeholder='Comment' onChange={(e) => setInputComment(e.target.value)} onKeyDown={(e) => handleEnter(e)} />
            {commentList.map((item, index) => <Comment key={index} user={owner} commentList={item} />)}
        </div>

    )
}

export default Comments