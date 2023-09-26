import { useEffect, useRef, useState } from 'react';
import { Steno } from 'react-steno';
import style from './BlogCreator.module.scss';
import Compressor from 'compressorjs';
import ClickOutSideListener from '../ClickOutSideListener';
import EditorToolBar from '../EditorToolBar/EditorToolBar';
import { useTabContext } from '../../Context/TabContext';
import ImageEditing from '../ImageCrop/ImageEditing';

const BlogCreator = ({ blog }) => {
    const { title, setTitle, description, setDescription, undoHistory,isVideoArticle } = useTabContext()
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const descriptionFnRef = useRef(null);
    const titleFnRef = useRef(null);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const [formDataImage, setFormDataImage] = useState(blog ? blog.img_url : '');
    const [image, setImage] = useState('');
    const [openImageMenu, setOpenImageMenu] = useState(false);
    const [wikiTag, setWikiTag] = useState(blog ? blog.tag : [])
    const tagRef = useRef(null);
    const [openTag, setOpenTag] = useState(blog ? true : false);
    const [activeEditorRef, setActiveEditorRef] = useState();
    const [descriptionAlignment, setDescriptionAlignment] = useState('left')
    const [fontDescriptionSize, setFontDescriptionSize] = useState(11);
    const [fontTitleSize, setFontTitleSize] = useState(24);
    const [activeEditor, setActiveEditor] = useState('');
    const [activeEditorInnerRef, setActiveEditorInnerRef] = useState('');
    const [isEditImage, setIsEditImage] = useState(false);

    useEffect(() => {
        setTitle(blog ? blog.title : '');
        setDescription(blog ? blog.description : '');

    }, [])

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

    const isImageEditing = () => {
        setIsEditImage(false);
    }

    const getEditedImage = (file) => {
        if (file && file.size < 8000000) {
            let updatedForm;//= {...formData};
            updatedForm = URL.createObjectURL(file);
            imageCompressor(file);
            setImage(file);
            setFormDataImage(updatedForm);
            console.log('file', file);
        }
    }

    



    return (
        <div className={style["wiki-blog-creator-container"]}>
           {activeEditor === 'description' && <EditorToolBar
                innerEditorRef={activeEditorInnerRef}
                activeEditorRef={activeEditorRef}
                alignment={setDescriptionAlignment}
                activeState={activeEditor}
                fontSize={activeEditor === "title" ? fontTitleSize : fontDescriptionSize}
                setFontSize={activeEditor === 'title' ? setFontTitleSize : setFontDescriptionSize}
            />}
            <div className={style["wiki-blog-creator-body"]}>
                <div className={style["wiki-blog-title-steno"]}>
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
                <div className={`${style["wiki-blog-image"]}  ${formDataImage ? style['wiki-image-update'] : ''}`}>
                    <input type="file" accept="image/jpg, image/jpeg, image/svg" className={style['wiki-file-input-class']} id='wiki-file-input' onChange={(e) => handleFileChange(e, 'featuredImage')} />

                    <form className={formDataImage ? style['wiki-file-form'] : ''} style={{ background: 'url(' + formDataImage + ') no-repeat center center' }}>
                        {!formDataImage && <label className={style['wiki-image-upload']} htmlFor="wiki-file-input">{`Upload ${isVideoArticle ?'Video' :'Image'}`}</label>}
                        {formDataImage && <><span className={style['wiki-dot-container']}><span className={style['wiki-3-dot']} onClick={(e) => {
                            e.stopPropagation();
                            setOpenImageMenu(prev => !prev)

                        }}></span></span>
                            {openImageMenu && <ClickOutSideListener onOutsideClick={() => setOpenImageMenu(false)}>
                                <div className={style['wiki-image-option']}>
                                    <label htmlFor='wiki-file-input'>Upload New</label> <br />
                                    {!isVideoArticle && <><label onClick={() => {
                                        setIsEditImage(true);
                                    }}>Edit</label> <br /></>}
                                    <label onClick={handleDeleteSelectImage}>Delete</label>
                                </div>
                            </ClickOutSideListener>}
                        </>}
                    </form>
                    {isEditImage && <ImageEditing props={formDataImage} hooksChange={getEditedImage} crop={isImageEditing} />}
                </div>
                <div className={style["wiki-blog-tag"]}>
                    {!openTag && <button className={style['wiki-tag-creation']} onClick={() => setOpenTag(true)} > Add Tags</button>}
                    {openTag &&
                        <div className={style['field-wrapper'] + ' ' + style['topics-wrapper']}>
                            <div className={style['tag-inner']} onClick={(e) => handleCapsuleInputFocus(e, 'tag')}>
                                {wikiTag &&
                                    wikiTag.map((obj, index) => (
                                        <div key={index} className={style['tag-box']}>
                                            <div className={style['tag-text']}>{obj}</div>
                                            <button className={style['btn-close']} onClick={(e) => handleCapsuleInputClose(e, index, 'topics')}></button>
                                        </div>
                                    ))
                                }

                                <div className={style['topic-input']}>
                                    <input type='text' ref={tagRef} className={style['topic-input']} placeholder='Search or add new' onKeyUp={(event) => { onKeyUpEvent(event, 'tag') }}></input>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className={style["wiki-blog-description-steno"]}>
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