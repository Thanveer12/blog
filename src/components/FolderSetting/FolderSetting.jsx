import React, { useState } from "react"
import './FolderSetting.scss';
import UserList from "./UserList";

const folder = [{
    'id': 1,
    'name': 'Company Docs',
    'user': [{
        cover_img_url: null,
        email: "v@ascendeum.com",
        first_name:"Vaibhav",
        id:2,
        last_name: "Singh",
        user_name: "vaibhav",
    },{
        cover_img_url: null,
        email: "chandan@ascendeum.com",
        first_name:"chan",
        id:3,
        last_name: "chahan",
        user_name: "chandan",
    },{
        cover_img_url: null,
        email: "than@ascendeum.com",
        first_name:"thanveer",
        id:4,
        last_name: "ahamed",
        user_name: "thanveer",
    }]
},{
    'id': 2,
    'name': 'OnBoarding',
    'user': [{
        cover_img_url: null,
        email: "v@ascqendeum.com",
        first_name:"Vaiewbhav",
        id:2,
        last_name: "Sincdgh",
        user_name: "vaicdbhav",
    },{
        cover_img_url: null,
        email: "chandanbf@ascendeum.com",
        first_name:"chbfan",
        id:3,
        last_name: "chafbhan",
        user_name: "chafbndan",
    },{
        cover_img_url: null,
        email: "than@asfcendeum.com",
        first_name:"thafnveer",
        id:4,
        last_name: "ahahmed",
        user_name: "tha hnveer",
    }]
},{
    'id': 3,
    'name': 'Engineering',
    'user': [{
        cover_img_url: null,
        email: "v@asce hndeum.com",
        first_name:"Vai hbhav",
        id:2,
        last_name: "Sij ngh",
        user_name: "vaibhjhav",
    },{
        cover_img_url: null,
        email: "chandwcan@ascendeum.com",
        first_name:"chcwan",
        id:3,
        last_name: "chahan",
        user_name: "chawcndan",
    },{
        cover_img_url: null,
        email: "than@asecdcendeum.com",
        first_name:"thafsnveer",
        id:4,
        last_name: "ahaetmed",
        user_name: "thanveveer",
    }]
},{
    'id': 4,
    'name': 'Design',
    'user': [{
        cover_img_url: null,
        email: "v@ascescndeum.com",
        first_name:"Vaisbhav",
        id:2,
        last_name: "Singsfh",
        user_name: "vaixbhav",
    },{
        cover_img_url: null,
        email: "chandan@sfascendeum.com",
        first_name:"chanvsf",
        id:3,
        last_name: "chahsan",
        user_name: "chandan",
    },{
        cover_img_url: null,
        email: "than@assfcendeum.com",
        first_name:"thafvnveer",
        id:4,
        last_name: "ahafmed",
        user_name: "thavsnveer",
    }]
},{
    'id': 5,
    'name': 'Product',
    'user': [{
        cover_img_url: null,
        email: "v12@ascendeum.com",
        first_name:"Va12ibhav",
        id:2,
        last_name: "Si2ngh",
        user_name: "va2ibhav",
    },{
        cover_img_url: null,
        email: "chand21an@ascendeum.com",
        first_name:"c21han",
        id:3,
        last_name: "ch12ahan",
        user_name: "ch2andan",
    },{
        cover_img_url: null,
        email: "than@as21cendeum.com",
        first_name:"tha12nveer",
        id:4,
        last_name: "aha21med",
        user_name: "tha2nveer",
    }]
},{
    'id': 6,
    'name': 'Human Resource',
    'user': [{
        cover_img_url: null,
        email: "v@ascewrvndeum.com",
        first_name:"Vawribhav",
        id:2,
        last_name: "S5ringh",
        user_name: "vai42bhav",
    },{
        cover_img_url: null,
        email: "chandan@42ascendeum.com",
        first_name:"cha42n",
        id:3,
        last_name: "chahan",
        user_name: "chandan",
    },{
        cover_img_url: null,
        email: "than121@ascendeum.com",
        first_name:"than12veer",
        id:4,
        last_name: "aham122ed",
        user_name: "thanv21eer",
    }]
}]

const FolderSetting = () => {
    const [searchFolderClick, setSearchFolderClick] = useState(false);
    const [folderList, setFolderList] = useState(folder);
    const [openFolderSearch, setOpenFolderSearch] = useState(false)
    const [userDetails, setUserDetails] = useState('')

    return (
        <div className="wiki-folder-container">
            <div className="wiki-header-folder">
                {!searchFolderClick && <div className="wiki-title">Manage Folder</div>}
                <div className={"wiki-folder_right-side"+ (searchFolderClick ? " wiki-folder_right-side-increase" : '')}>
                    <button className="wiki-folder-search" title="open search" onClick={() => setSearchFolderClick(true)}></button>
                    {searchFolderClick && <input type={'text'} className={'wiki-folder-search-input'} autoFocus/>}
                </div>
                {searchFolderClick && <button className="wiki-folder-search-close" title="Close Search" onClick={(e) => {
                    e.stopPropagation();
                    setSearchFolderClick(false)
                }}></button>}
            </div>

            <div className="wiki-folder-body">
                <div className="wiki-folder-body-left">
                    {!openFolderSearch && <button className="wiki-folder-create" onClick={(e) => {
                        e.stopPropagation();
                        setOpenFolderSearch(true)
                    }}> Folder</button>}
                    {openFolderSearch && <input type={'text'} className={'wiki-folder-create-input'} placeholder="Type Here" autoFocus/>}
                        {folderList.map((list, index) => {
                            return (
                                <div className="wiki-list-wrapper" key={index + list.name}>
                                    <div className="wiki-list-data" onClick={() =>{ 
                                        setUserDetails(list.user)
                                    }
                                    }>{list.name}</div>

                                </div>
                            )
                        })}
                </div>
                <div className="wiki-folder-body-right">
                    <UserList userDetail={userDetails}/>
                </div>
            </div>
        </div>
    )
}

export default FolderSetting;