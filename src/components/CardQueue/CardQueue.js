import React from 'react';
import Avatar from '../Avatar/Avatar';
import './CardQueue.scss'



const CardQueue = ({ item }) => {

    return (
        <div id='cardqueue-wrapper'>
            {
                item.map((owner,index) => <span key={owner.first_name+index} style={{zIndex:index + 1}}><Avatar
                    imgSrc={owner.cover_img_url}
                    firstName={owner.first_name ? owner.first_name : ""}
                    lastName={owner.last_name}
                    alt={`${owner.first_name}'s pic`}
                    height={16}
                    width={16}
                    fontSize={9}
                    borderRadius='2px' 
                    /></span>)
            }
        </div>
    )
}

export default CardQueue