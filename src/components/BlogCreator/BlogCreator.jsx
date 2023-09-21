import { useRef, useState } from 'react';
import { Steno } from 'react-steno';
import './BlogCreator.scss';
import Compressor from 'compressorjs';
import ClickOutSideListener from '../ClickOutSideListener';
import EditorToolBar from '../EditorToolBar/EditorToolBar';
import { useTabContext } from '../../Context/TabContext';

const BlogCreator = () => {

    const { title, setTitle, description, setDescription, undoHistory } = useTabContext()
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const descriptionFnRef = useRef(null);
    const titleFnRef = useRef(null);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const [formDataImage, setFormDataImage] = useState('');
    const [image, setImage] = useState('');
    const [openImageMenu, setOpenImageMenu] = useState(false);
    const [wikiTag, setWikiTag] = useState([])
    const tagRef = useRef(null);
    const [openTag, setOpenTag] = useState(false);
    const [activeEditorRef, setActiveEditorRef] = useState();
    const [descriptionAlignment, setDescriptionAlignment] = useState('left')
    const [fontDescriptionSize, setFontDescriptionSize] = useState(24);
    const [fontTitleSize, setFontTitleSize] = useState(11);
    const [activeEditor, setActiveEditor] = useState('');
    const [activeEditorInnerRef, setActiveEditorInnerRef] = useState('');

    function handleFileChange(e, type) {
        e.preventDefault();
        // let updatedFormData = {...formData};
        let updatedImageData;
        let allowedTypes = ['image/jpeg', 'image/jpg'];
        let file = e.target.files[0];

        const reader = new FileReader();
        // if (!validateSlug) {
        //   isExist(slug);
        //   setValidateSlug(true);
        // }
        reader.addEventListener('load', () => {
            updatedImageData = reader.result;
            // updatedFormData['image'] = reader.result;
        });

        if (file !== undefined) {
            //   articleEdit = true;
            let fileType = file['type'];
            if (allowedTypes.includes(fileType)) {
                if (type === 'featuredImage') {
                    // updatedFormData['image'] = URL.createObjectURL(file);
                    updatedImageData = URL.createObjectURL(file);
                    setImage(file);
                    var img = new Image();
                    img.onload = () => {
                        setDimension({ width: img.naturalWidth, height: img.naturalHeight })
                    }
                    img.src = URL.createObjectURL(file);
                }
                setFormDataImage(updatedImageData)
                // setFormData(updatedFormData);
            } else {
                return false;
            }
            imageCompressor(file);
        }
    }

    const imageCompressor = (file) => {
        if (file.size < 8000000) {
            new Compressor(file, {
                quality: 0.8,
                convertSize: 1000000,
                // The compression process is asynchronous,
                // which means you have to access the `result` in the `success` hook function.
                success(result) {
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                        // let updatedFormData = {...formData};
                        // updatedFormData['image'] = reader.result;
                        // setFormData(updatedFormData);
                        setFormDataImage(reader.result);
                    })
                    const formData1 = new FormData();
                    // The third parameter is required for server
                    formData1.append('file', result, result.name);
                    setImage(result);

                    reader.readAsDataURL(result);
                    return result;
                    // Send the compressed image file to server with XMLHttpRequest.
                },
                error(err) {
                    //   alertService.showToast('error', err.message || 'some error throws on image compression');
                },
            });
        } else {
            //   alertService.showToast("warn", "File size is too Big");
        }
    }

    const handleDeleteSelectImage = () => {
        setImage('')
        setFormDataImage('');
        setOpenImageMenu(false)
    }

    //close subject and topic capsule remove
    const handleCapsuleInputClose = (e, index, type) => {
        e.preventDefault();
        let updatedFormData = [...wikiTag];
        updatedFormData.splice(index, 1);
        setWikiTag(updatedFormData);
        if (updatedFormData.length === 0) setOpenTag(false)
    }

    //used to handle subject and topic
    const handleCapsuleInputFocus = (e, type) => {
        e.preventDefault();
        if (type === 'tag') {
            //   tagRef.current.focus();
        }
    }

    /**************************
    * Tag releated function
    */
    const onKeyUpEvent = (event, type) => {
        if (type === 'tag') {
            if (event.key === 'Enter') {
                const getAllTag = [...wikiTag];
                setWikiTag([...getAllTag, tagRef.current.value])
                tagRef.current.value = '';

            } else {
                tagRef.current.value = event.target.value;
            }
            let collections = [];
            //   setShowTagSuggestionsDropdown(true);

            //   for (let i = 0; i < tagsList.length; i++) {
            //     let tags = tagsList[i].tag.toLowerCase();
            //     let searchValue = event.target.value.toLowerCase();
            //     if (tags.includes(searchValue)) {
            //       collections.push(tagsList[i]);
            //     }
            //   }
            //   setSearchedTopics(collections);

        }
    }

    return (
        <div className="wiki-blog-creator-container">
            <EditorToolBar
                innerEditorRef={activeEditorInnerRef}
                activeEditorRef={activeEditorRef}
                alignment={setDescriptionAlignment}
                activeState={activeEditor}
                fontSize={activeEditor === "title" ? fontTitleSize : fontDescriptionSize}
                setFontSize={activeEditor === 'title' ? setFontTitleSize : setFontDescriptionSize}
            />
            <div className="wiki-blog-creator-body">
                <div className="wiki-blog-title-steno">
                    {<Steno
                        html={title}
                        disable={false}
                        onClick={() => {
                            // getStenoSelection.current = document.getSelection();
                            setActiveEditor('title')
                            setActiveEditorRef(titleFnRef)
                            setActiveEditorInnerRef(titleRef)
                            // const range = getStenoSelection?.current?.getRangeAt(0)
                            // getStenoRange.current = range.cloneRange();
                        }}

                        onChange={(val) => {
                            setTitle(val)
                            const history = {
                                history: {
                                    title: val,
                                    description: description
                                }
                            }
                            undoHistory.push(history)
                        }}
                        innerRef={titleRef}
                        backgroundColor={'transparent'}
                        onChangeBackgroundColor={() => { }}
                        fontColor={'#fff'}
                        onChangeFontColor={() => { }}
                        ref={titleFnRef}
                        isToolBarVisible={false}
                        toolbarPosition={"bottom"}
                        formatStyle={false}
                        onChangeOfKeepStyle={() => { }}
                        showAddFileOption={false}
                        fileList={[]}
                        sendMsgOnEnter={false}
                        autoHeight={true}
                        minEditorHeight='20px'
                        maxEditorHeight="300px"
                        placeHolder={'Enter Title Here'}
                        fontSize={fontTitleSize}

                    />}
                </div>
                <div className={"wiki-blog-image" + (formDataImage ? ' wiki-image-update' : '')}>
                    <input type="file" accept="image/jpg, image/jpeg, image/svg" id='wiki-file-input' onChange={(e) => handleFileChange(e, 'featuredImage')} />
                    <form className={formDataImage ? 'wiki-file-form' : ''} style={{ background: 'url(' + formDataImage + ') no-repeat center center' }}>
                        {!formDataImage && <label className='wiki-image-upload' htmlFor="wiki-file-input">Upload Image</label>}
                        {formDataImage && <><span className='wiki-dot-container'><span className='wiki-3-dot' onClick={(e) => {
                            e.stopPropagation();
                            setOpenImageMenu(prev => !prev)

                        }}></span></span>
                            {openImageMenu && <ClickOutSideListener onOutsideClick={() => setOpenImageMenu(false)}> <div className='wiki-image-option'>
                                <label htmlFor='wiki-file-input'>Upload New</label> <br />
                                <label>Edit</label> <br />
                                <label onClick={handleDeleteSelectImage}>Delete</label>
                            </div>
                            </ClickOutSideListener>}
                        </>}
                    </form>
                </div>
                <div className="wiki-blog-tag">
                    {!openTag && <button className='wiki-tag-creation' onClick={() => setOpenTag(true)} > Add Tags</button>}
                    {openTag &&
                        <div className={'field-wrapper' + ' ' + 'topics-wrapper'}>
                            <div className={'tag-inner'} onClick={(e) => handleCapsuleInputFocus(e, 'tag')}>
                                {wikiTag &&
                                    wikiTag.map((obj, index) => (
                                        <div key={obj.id} className={'tag-box'}>
                                            <div className={'tag-text'}>{obj}</div>
                                            <button className={'btn-close'} onClick={(e) => handleCapsuleInputClose(e, index, 'topics')}></button>
                                        </div>
                                    ))
                                }

                                <div className={'topic-input'}>
                                    <input type='text' ref={tagRef} className={'topic-input'} placeholder='Search or add new' onKeyUp={(event) => { onKeyUpEvent(event, 'tag') }}></input>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="wiki-blog-description-steno">
                    {<Steno
                        html={description}
                        disable={false}
                        onClick={() => {
                            // getStenoSelection.current = document.getSelection();
                            setActiveEditor('description');
                            // const range = getStenoSelection?.current?.getRangeAt(0)
                            // getStenoRange.current = range.cloneRange();
                            setActiveEditorRef(descriptionFnRef);
                            setActiveEditorInnerRef(descriptionRef)
                        }}

                        onChange={(val) => {
                            setDescription(val)
                            const history = {
                                history: {
                                    title: title,
                                    description: val
                                }
                            }
                            undoHistory.push(history)
                        }}
                        innerRef={descriptionRef}
                        backgroundColor={'transparent'}
                        onChangeBackgroundColor={() => { }}
                        fontColor={'#fff'}
                        onChangeFontColor={() => { }}
                        ref={descriptionFnRef}
                        isToolBarVisible={false}
                        toolbarPosition={"bottom"}
                        formatStyle={false}
                        onChangeOfKeepStyle={() => { }}
                        showAddFileOption={false}
                        fileList={[]}
                        sendMsgOnEnter={false}
                        autoHeight={true}
                        minEditorHeight='20px'
                        maxEditorHeight="300px"
                        placeHolder={'Write something here...'}
                        horizontalAlignment={descriptionAlignment}
                        fontSize={fontDescriptionSize}
                    />}
                </div>
            </div>

        </div>
    )
}

export default BlogCreator;