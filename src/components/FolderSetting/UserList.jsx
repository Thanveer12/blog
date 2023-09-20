import React, { memo, useEffect, useState } from "react"
import './UserList.scss';
import SpeedSelect from 'react-speedselect';
import Avatar from "../Avatar/Avatar";

const role = [
    {
        'id': 1,
        'name': 'Admin'
    }, {
        'id': 2,
        'name': 'Editor'
    }, {
        'id': 3,
        'name': 'Viewer'
    }]

const UserList = ({userDetail}) => {

    const [openNameSearch, setOpenNameSearch] = useState(false)
    const [userInfo, setUserInfo] = useState(userDetail ? userDetail : [])

    const onOptionSelect = (e) => {
        console.log(e, 'data')
    }

    useEffect(() => {
        setUserInfo(userDetail ? userDetail : [])
    }, [userDetail])

    const removeUserFromFolder = () => {

    }

    return (
        <div className="wiki-user-container">
            <div className="wiki-folder-speedselect">
                    <SpeedSelect
                    // options={this.state.clientsList} // required
                    options={role} // required
                    selectedOption={""} // required
                    onSelect={(e) => onOptionSelect(e)} // required
                    displayKey='name' // required if options is an array of objects, 
                    uniqueKey='id' // required if options is an array of objects
                    selectLabel="Viewers" // optional, Default='Select'. It is always visible in case of multiple and visible untill a selection is made in case of single
                    maxHeight={100}
                    maxWidth={80}
                    maxw
                    prominentLabel='Role'
                    isLabelClickable={true}
                    dropdownAlignment='right'
                    // onDropDownOpen={this.handleDropDownOpen}
                />
            </div>

            <div className="wiki-user-search-wrapper">
                {!openNameSearch && <button className="wiki-user-create" onClick={(e) => {
                        e.stopPropagation();
                        setOpenNameSearch(true)
                    }}> Folder</button>}
                    {openNameSearch && <input type={'text'} className={'wiki-user-create-input'} placeholder="Type Name or Email Id" autoFocus/>}
            </div>
            {userInfo.map((user) => {
                return (<div className="wiki-user-data-wrapper">
                <Avatar imgSrc={user.cover_img_url}
                    firstName={user.first_name}
                    lastName={user.last_name}
                    alt={`${user.first_name}'s pic`}
                    height={20}
                    width={20}
                    fontSize={9} 
                    borderRadius={2}
                    />

                <div className="wiki-username">{user.first_name + " " + user.last_name}</div>

                <div className="wiki-folder-user-speedselect">
                    <SpeedSelect
                    // options={this.state.clientsList} // required
                    options={role} // required
                    selectedOption={""} // required
                    onSelect={(e) => onOptionSelect(e)} // required
                    displayKey='name' // required if options is an array of objects, 
                    uniqueKey='id' // required if options is an array of objects
                    selectLabel="Viewers" // optional, Default='Select'. It is always visible in case of multiple and visible untill a selection is made in case of single
                    maxHeight={100}
                    maxWidth={80}
                    isLabelClickable={true}
                    dropdownAlignment='right'
                    // onDropDownOpen={this.handleDropDownOpen}
                />
                </div>
                
                <button className="wiki-delete-minus" onClick={removeUserFromFolder}></button>

            </div>)
            })}
        </div>
    )
}

export default UserList;