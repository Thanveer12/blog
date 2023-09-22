import React from 'react'
import AvatarSection from './AvatarSection/AvatarSection'
import Tags from '../Tags/Tags'
import Comments from './Comments/Comments'
import style from "./blog.module.scss";
import { useTabContext } from '../../Context/TabContext';
import BlogCreator from '../BlogCreator/BlogCreator';


const Blog = ({ blogData }) => {
    const { tags, owner } = blogData;
    const {editMode} = useTabContext();

   

    return (
        <>
            {!editMode && <div className={style['blog-parent-wrapper']}>
                <h1>Savoring Fiversity: Embarking on a Voyage Through Exotic Spices </h1>
                <img src='https://picsum.photos/seed/picsum/1200/400' alt="blog_image"></img>
                <AvatarSection user={owner} />
                <div className={style['bolg-tags-wrapper']}>
                    <Tags tags={tags} />
                </div>
                <div className={style['blog-content-wrapper']}>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <h5>This is Content Subheading</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


                    <h5>This is Content Subheading</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


                    <h5>This is Content Subheading</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


                    <h5>This is Content Subheading</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className={style['blog-divider']}></div>
                <Comments commentData={blogData} />
            </div>}

            {editMode && <BlogCreator blog={blogData}/>}
        </>
    )
}

export default Blog