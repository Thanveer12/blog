import React, { useRef, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Tabs.scss';
import ArticleTypeOption from './ArticleTypeOption';
import ClickOutsideListener from '../ClickOutSideListener';
import { useTabContext } from '../../Context/TabContext';



const key = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));

const backgroundColor = ['#986f0b', '#7a7574', '#986f0b', '#a4262c', '#8764b8',
    '#4f6bed', '#881798', '#4a154a', '#8764b8', '#7a7574', '#881798', '#4f6bed',
    '#8764b8', '#4f6bed', '#a4262c', '#004e8c', '#986f0b', '#ca5010', '#4f6bed', '#038387',
    '#7a7574', '#c239b3', '#881798', '#8764b8', '#986f0b', '#7a7574'];

const colorsList = [];
for (let i = 0; i < key.length; i++) {
    let obj = { key: key[i], fontColor: '#FFF', backgroundColor: backgroundColor[i] }
    colorsList.push(obj);
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export default function Tabs({ tabs, activeTabId, onOpen, onEdit, onPublish, onRemove, onPanelToggle, onTabAddBtn, onTabsOrderChange, showEditBtn = true, showAddBtn = true, showAvatar = false, backgroundColor = '', homeIcon }) {
    const { openArticleTypeMenuDropdown, setOpenArticleTypeMenuDropdown } = useTabContext();
    const tabContainerRef = useRef(null);
    const [dummy, setDummy] = useState(0); // for rendering whenever tab length changes so that view gets updated

    useEffect(() => {
        // do an extra render when
        // 1. A new tab is added so that it gets reflected in tab list
        setDummy(dummy + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabs, tabs.length]);

    useEffect(() => {
        const activeTabElement = tabContainerRef.current.querySelector(`#tab-${activeTabId}`);
        if (activeTabElement) {
            const isWithinView = (activeTabElement.offsetLeft >= tabContainerRef.current.scrollLeft) && (activeTabElement.offsetLeft - tabContainerRef.current.scrollLeft < tabContainerRef.current.offsetWidth);
            if (!isWithinView) {
                const scrollElement = tabContainerRef.current;
                const currentScrollPos = scrollElement.scrollLeft;
                const finalScrollPos = activeTabElement.offsetLeft;
                const scrollSpeed = finalScrollPos > currentScrollPos ? 40 : -40;

                const scroll = () => {
                    if ((scrollSpeed > 0 && scrollElement.scrollLeft <= finalScrollPos) || (scrollSpeed < 0 && scrollElement.scrollLeft >= finalScrollPos)) {
                        const currentScrollLeft = scrollElement.scrollLeft;
                        scrollElement.scrollLeft = scrollElement.scrollLeft + scrollSpeed;
                        const noMoreScrollPossible = currentScrollLeft === scrollElement.scrollLeft;
                        if (!noMoreScrollPossible) {
                            requestAnimationFrame(scroll);
                        } else {
                            setDummy(dummy + 1);
                        }
                    }
                };
                requestAnimationFrame(scroll);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTabId, tabs]);



    const handleSlideLeftBtnClick = () => scrollSmoothly('left');
    const handleSlideRightBtnClick = () => scrollSmoothly('right');
    const scrollSmoothly = (direction) => {
        const scrollElement = tabContainerRef.current;
        const scrollAmount = scrollElement ? Math.max(100, (scrollElement.scrollWidth - scrollElement.offsetWidth) / 4) : 0;
        const finalScrollPos = direction === 'right' ? Math.min(scrollElement.scrollLeft + scrollAmount, scrollElement.scrollWidth - scrollElement.offsetWidth) : Math.max(scrollElement.scrollLeft - scrollAmount, 0);
        const currentScrollPos = scrollElement.scrollLeft;
        const scrollSpeed = finalScrollPos > currentScrollPos ? scrollAmount / 20 : -scrollAmount / 20; // speed in pixels/ms

        const scroll = () => {
            if ((scrollSpeed > 0 && scrollElement.scrollLeft <= finalScrollPos) || (scrollSpeed < 0 && scrollElement.scrollLeft >= finalScrollPos)) {
                const currentScrollLeft = scrollElement.scrollLeft;
                scrollElement.scrollLeft = scrollElement.scrollLeft + scrollSpeed;
                const noMoreScrollPossible = currentScrollLeft === scrollElement.scrollLeft;
                if (!noMoreScrollPossible) {
                    requestAnimationFrame(scroll);
                } else {
                    setDummy(dummy + 1);
                }
            }
        };
        requestAnimationFrame(scroll);
    }

    const showSlideBtns = tabContainerRef.current ? tabContainerRef.current.scrollWidth > tabContainerRef.current.offsetWidth : false;
    const showLeftSlideBtn = showSlideBtns && tabContainerRef.current.scrollLeft > 0;
    const showRightSlideBtn = showSlideBtns && tabContainerRef.current.scrollLeft < tabContainerRef.current.scrollWidth - tabContainerRef.current.offsetWidth;


    const handleMouseWheel = (e) => {
        e.stopPropagation();
        tabContainerRef.current.scrollLeft = tabContainerRef.current.scrollLeft + e.deltaY + e.deltaX;
        setDummy(dummy + 1);
    }

    const handleModeChangeBtnClick = (tab, isInEditmode) => {
        if (isInEditmode) {
            onPublish(tab.id);
        } else {
            console.log(tab.id)
            onEdit(tab.id);
            // also open the plotterPanel in Edit mode if not opened already
            if (tab.hasOwnProperty('showPlotterPanel') && !tab.showPlotterPanel) { onPanelToggle(tab.id, 'showPlotterPanel') }
        }
    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) return;
        if (result.destination.index === 0) return;

        let updatedTabs = reorder(tabs, result.source.index, result.destination.index);
        onTabsOrderChange(updatedTabs);
    }

    return (
        <div className={'sub-header-tabs-container' + (homeIcon === 'wiki' ? ' wiki-sub-header' : '')}>

            {/* First tab is always home tab */}
            {/* {[tabs[0]].map((tab) => {
                const isSelected = String(tab.id) === activeTabId;
                const isEditMode = tab.editMode;

                return (
                    <div key="home-tab" className={'tab-home-fixed' + (isSelected ? ' selected' : '')}>
                        <div className={'tab-inner'} onClick={() => onOpen(tab.id, isEditMode)}>
                            <span className="tab-title"> <i></i><span>Home</span></span>
                        </div>
                    </div>
                )
            })} */}
            {/* First tab is always home tab and followed by Fixed Tabs */}
            {/* {tabs.length && tabs.filter(tab => tab.id === 'home' || (tab.hasOwnProperty('isFixedTab') && tab.isFixedTab)).map((tab) => { */}
            {tabs.length && [...tabs.filter(tab => tab.id === 'home'), ...tabs.filter(tab => (tab.hasOwnProperty('isFixedTab') && tab.isFixedTab) && tab.id !== 'home')].map((tab) => {
                const isSelected = String(tab.id) === activeTabId;
                const isEditMode = tab.editMode;
                const showName = tab.hasOwnProperty('showName') ? tab.showName : true;
                const isNewTab = String(tab.id).includes('new');

                const canSwitchToEditMode = !isNewTab && tab.privileges && tab.privileges.includes('EDIT');
                if (!showAvatar && !showName) {
                    throw Error('Both showAvatar and showName cannot be false');
                }

                return (
                    <div key={String(tab.id)} className={(tab.id === 'home' ? 'tab-home-fixed' : 'tab-fixed') + (isSelected ? ' selected' : '') + (!isSelected && homeIcon === 'wiki' ? ' tab-home-fixed-border' : '')} style={!isSelected && backgroundColor ? { background: backgroundColor } : {}}>
                        <div className={'tab-inner'} onClick={() => onOpen(tab.id, isEditMode)}>
                            {homeIcon !== 'wiki' && <div className="tab-title">
                                {tab.id === 'home' && <i></i>}
                                {tab.id !== 'home' && showAvatar &&
                                    <Avatar
                                        imgSrc={tab.img_url}
                                        firstName={tab.hasOwnProperty('firstName') ? tab.firstName : tab.name.split(' ')[0]}
                                        lastName={tab.hasOwnProperty('lastName') ? tab.lastName : tab.name.split(' ')[1]}
                                        alt={tab.hasOwnProperty('firstName') ? tab.firstName : tab.name.split(' ')[0] + "'s pic"}
                                    />}
                                {showName && <span className='capitalize'>{homeIcon !== 'wiki' && tab.name}</span>}
                                {isSelected && showEditBtn && tab.id !== 'home' && (onEdit || onPublish) &&
                                    <div className={'tab-selection'}>
                                        {!isNewTab &&
                                            <span className={'tab-mode ' + (isEditMode ? 'edit-mode' : 'view-mode') + (!canSwitchToEditMode ? ' disabled' : '')}
                                                title={!canSwitchToEditMode ? 'You don\'t have privilege to edit the dashboard' : `Switch to ${isEditMode ? 'Viewing' : 'Editing'}`}
                                                onClick={(e) => { e.stopPropagation(); handleModeChangeBtnClick(tab, isEditMode) }}>
                                                {isEditMode ? 'Editing' : 'Viewing'}
                                            </span>
                                        }
                                    </div>
                                }
                            </div>}
                            {homeIcon === 'wiki' && <div className='wiki-home-icon'>
                            </div>}
                        </div>
                        {homeIcon === 'wiki' && <span className='wiki-separator'></span>}
                    </div>
                )
            })
            }

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => {
                        return (
                            <div className="sub-header-tabs-droppable" ref={provided.innerRef} {...provided.droppableProps} >
                                <div className={'sub-header-tabs' + (showSlideBtns ? ' h-scroll' : '')} ref={tabContainerRef} onWheel={handleMouseWheel}  >
                                    {tabs.map((tab, index) => {
                                        if (tab.id === 'home') return null;
                                        if (tab.hasOwnProperty('isFixedTab') && tab.isFixedTab) return null;
                                        const isSelected = String(tab.id) === activeTabId;
                                        const isEditMode = tab.editMode;
                                        const isNewTab = String(tab.id).includes('new');
                                        const showName = tab.hasOwnProperty('showName') ? tab.showName : true;

                                        const canSwitchToEditMode = !isNewTab && tab.privileges && tab.privileges.includes('EDIT');
                                        // console.log('rendering tab : ', tab.id);
                                        return (
                                            <Draggable key={tab.id + '_' + index} draggableId={tab.id + '_' + index} index={index}>
                                                {(provided, snapshot) => (
                                                    <>
                                                        <div className={'tab' + (isSelected ? ' selected' : '') + (!isSelected && homeIcon === 'wiki' ? ' tab-home-fixed-border' : '')}
                                                            id={`tab-${tab.id}`}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            onClick={() => onOpen(tab.id, isEditMode)} style={!isSelected && backgroundColor ? { background: backgroundColor } : {}}>
                                                            <div className={'tab-inner'}>
                                                                {tab.id !== 'home' && !isNewTab && showAvatar &&
                                                                    <Avatar
                                                                        imgSrc={tab.img_url}
                                                                        firstName={tab.hasOwnProperty('firstName') ? tab.firstName : tab.name.split(' ')[0]}
                                                                        lastName={tab.hasOwnProperty('lastName') ? tab.lastName : tab.name.split(' ')[1]}
                                                                        alt={tab.hasOwnProperty('firstName') ? tab.firstName : tab.name.split(' ')[0] + "'s pic"}
                                                                    />}
                                                                {homeIcon === 'wiki' && <span className='tab-icon-paper'></span>}
                                                                {showName && <span className="tab-title">{tab.name}</span>}
                                                                {isSelected && showEditBtn &&
                                                                    <div className={'tab-selection'}>
                                                                        {!isNewTab &&
                                                                            <span className={'tab-mode ' + (isEditMode ? 'edit-mode' : 'view-mode') + (!canSwitchToEditMode ? ' disabled' : '')}
                                                                                title={!canSwitchToEditMode ? 'You don\'t have privilege to edit the dashboard' : `Switch to ${isEditMode ? 'Viewing' : 'Editing'}`}
                                                                                onClick={(e) => { e.stopPropagation(); handleModeChangeBtnClick(tab, isEditMode) }}>
                                                                                {isEditMode ? 'Editing' : 'Viewing'}
                                                                            </span>
                                                                        }
                                                                    </div>
                                                                }
                                                                {isSelected && <span className='tab-selected'></span>}
                                                                <span className={"tab-close" + (!isSelected ? ' show-on-hover' : '')} title='Close tab' onClick={(e) => { e.stopPropagation(); onRemove(tab.id) }}></span>
                                                            </div>
                                                            {homeIcon === 'wiki' && <span className='wiki-separator'></span>}
                                                        </div>

                                                    </>
                                                )}
                                            </Draggable>
                                        )
                                    })}

                                    {provided.placeholder}
                                    {showLeftSlideBtn && <button className="slide-tab-btn slide-tab-left" onClick={handleSlideLeftBtnClick}></button>}
                                    {showRightSlideBtn && <button className="slide-tab-btn slide-tab-right" onClick={handleSlideRightBtnClick}></button>}
                                </div>
                            </div>
                        )
                    }}
                </Droppable>
            </DragDropContext>

            {showAddBtn && <div className="add-dash-btn-wrapper">
                <button className="btn-link btn-newanalysis" onClick={(e) => { e.stopPropagation(); onTabAddBtn() }}>

                </button>

                {
                    openArticleTypeMenuDropdown &&
                    <ClickOutsideListener onOutsideClick={() => setOpenArticleTypeMenuDropdown(false)}>
                        <ArticleTypeOption />
                    </ClickOutsideListener>
                }

            </div>}

        </div>
    );
}

function Avatar({
    imgSrc = '',
    firstName,
    lastName = undefined,
    alt = 'profile_image',
}) {

    const [src, setSrc] = useState(imgSrc);
    lastName = lastName === undefined ? '' : lastName;
    const initials = ((firstName ? firstName.charAt(0) : '').toUpperCase() + (lastName ? lastName.charAt(0) : '')).toUpperCase();

    const [color, setColor] = useState({ fontColor: '#000', backgroundColor: '#FFF' });

    const validateProps = () => {
        // validate required props here before doing anything
        if (!firstName) {
            throw Error('firstName is mandatory, please make sure to add it under tabs array');
        }
    }

    useEffect(() => {
        setSrc(imgSrc);
        validateProps();
        let [colour] = colorsList.filter(c => c.key === initials.charAt(0));
        colour = !colour ? { key: '', fontColor: '#FFF', backgroundColor: '#c239b3' } : colour;
        setColor({ fontColor: colour.fontColor, backgroundColor: colour.backgroundColor });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initials, imgSrc]);

    return (
        <>
            {
                src ? <img
                    src={src}
                    alt={alt}
                    onError={() => setSrc('')}
                    className='avatar-img'
                /> : <div
                    className='initial'
                    style={{
                        color: color.fontColor,
                        backgroundColor: color.backgroundColor,
                    }}
                >
                    {initials}
                </div>
            }
        </>
    );
}