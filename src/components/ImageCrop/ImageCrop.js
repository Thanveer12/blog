import React, { useState, useRef, useEffect } from "react";
import Cropper from 'react-easy-crop';
// import 'react-image-crop/dist/ReactCrop.css';
import './ImageCrop.scss';

const radian = Math.PI / 180;

export default function ImageCrop(modalOpen) {
    const [crop, setCrop] = useState({ x: 10, y: 10, width: 700, height: 280 });
    const [cropimg, setcropimg] = useState();
    const [zoom, setZoom] = useState(1);
    const [modal, setModal] = useState(true);
    const [rotateimg, setRotateImg] = useState(modalOpen.props);
    const [cropImage, setCropImage] = useState('');
    const [rotate, setRotate] = useState(0);
    const [aspectRatio, setAspectRatio] = useState(16 / 9);

    const toggleModal = () => {
        modalOpen.hooksChange(cropImage);
        setModal(!modal);
        modalOpen.crop();
    };

    const closeModal = () => {
        setModal(!modal);
        modalOpen.crop();
    };

    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        if (rotateimg) {
            var cropper = await getCroppedImg(rotateimg, croppedAreaPixels, rotate);
            const file = new File([cropper], cropper.name, {
                type: cropper.type
            })
            if (file !== undefined) {
                setCropImage(file)
                setcropimg(URL.createObjectURL(file));
            }
        }
    }

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', (error) => reject(error))
            image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
            image.src = url
        })

    function rotateSize(width, height, rotation) {
        const rotRad = getRadianAngle(rotation)
        return {
            width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
            height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
        }
    }

    function getRadianAngle(degreeValue) {
        return (degreeValue) * (Math.PI / 180);
    }
    
    async function getCroppedImg(
        imageSrc,
        pixelCrop,
        rotation = 0,
        flip = { horizontal: false, vertical: false }
    ) {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            return null
        }
        const rotRad = getRadianAngle(rotation)
        // calculate bounding box of the rotated image
        const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
            image.width,
            image.height,
            rotation
        )
        // set canvas size to match the bounding box
        canvas.width = bBoxWidth
        canvas.height = bBoxHeight

        // translate canvas context to a central location to allow rotating and flipping around the center
        ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
        ctx.rotate(rotRad)
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
        ctx.translate(-image.width / 2, -image.height / 2)

        // draw rotated image
        ctx.drawImage(image, 0, 0)
        if (pixelCrop.width === 0) {
            pixelCrop.width = canvas.width;
            pixelCrop.height = canvas.height;
        }
        // croppedAreaPixels values are bounding box relative
        // extract the cropped image using these values
        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        )
        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height
        // paste generated rotate image at the top left corner
        ctx.putImageData(data, 0, 0)
        // As Base64 string
        // return canvas.toDataURL('image/jpeg');
        // As a blob
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                blob.name = 'image/jpeg';
                blob.lastModifiedDate = new Date();
                resolve(blob)
            }, 'image/jpeg')
        })
    }

    const handleTagFilter = (value) => {
        setAspectRatio(value);
    }

    const handleInputChange = async (e, type) => {
        if (type === 'rotate') {
            let math = Math.min(180, Math.max(-180, Number(e.target.value)));
            setRotate(Number(e.target.value));
        }
        if (type === 'rotate-right') {
            if (rotate + 90 === 360) {
                setRotate(0);
            } else if (rotate + 90 > 360) {
                setRotate(360 - rotate + 90);
            } else {
                setRotate(rotate + 90);
            }
        }
        if (type === 'rotate-left') {
            if (rotate - 90 === -360) {
                setRotate(0);
            } else if (rotate - 90 > -360) {
                setRotate(360 + rotate - 90);
            } else {
                setRotate(rotate - 90);
            }
        }
    }
    
    return (
        <div>
            {modal && (
                <div className={'wiki-modal'}>
                    <div onClick={setModal} className={'wiki-overlay'}></div>

                    <div className={'wiki-modal-content-crop'}>
                        <div className={'wiki-search-list'}>
                            <div className={'wiki-info-inner'}>
                                {rotateimg && <Cropper
                                    image={rotateimg}
                                    crop={crop}
                                    zoom={zoom}
                                    rotation={rotate}
                                    aspect={aspectRatio}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    onRotationChange={setRotate}
                                />}
                            </div>

                            <div className={'wiki-grid'}>
                                <div className={'wiki-select-dropdown'}>
                                    <label>Crop Ratio: </label>
                                    <select value={aspectRatio} onChange={(e) => handleTagFilter(e.target.value)}>
                                        <option value={1 / 1}>square</option>
                                        <option value={1 / 2}>1:2</option>
                                        <option value={2 / 1}>2:1</option>
                                        <option value={4 / 1}>4:1</option>
                                        <option value={3 / 4}>3:4</option>
                                        <option value={4 / 3}>4:3</option>
                                        <option value={16 / 9}>16:9</option>
                                    </select>
                                </div>
                                <div className={'wiki-right-side-nav'}>
                                    <button className={'wiki-right-rotate-button'} onClick={(e) => handleInputChange(e, 'rotate-right')}></button>
                                    <button className={'wiki-left-rotate-button'} onClick={(e) => handleInputChange(e, 'rotate-left')}></button>
                                </div>
                                <div className={'wiki-rotate'}>
                                    <label>Rotate: </label>
                                    <div className={'wiki-tooltip'}>
                                        <div className={'wiki-tooltiptext'}>{rotate}</div>
                                        <input className={'wiki-info'} type="range" id="vol" name="vol" min="-45" max="45" step='1' value={rotate} onChange={(e) => handleInputChange(e, 'rotate')}></input>
                                    </div>
                                </div>
                                <div className={'wiki-rotate'}>
                                    <label>scale: </label>
                                    <div className={'wiki-tooltip'}>
                                        <div className={'wiki-tooltiptext'}>{zoom}</div>
                                        <input className={'wiki-info'} type="range" id="vol" name="vol" min="1" max="3" step='0.1' value={zoom} onChange={(e, zoom) => setZoom(e.target.value)}></input>
                                    </div>
                                </div>
                            </div>

                            <div className={'wiki-action-buttons'}>
                                <button className={'wiki-btn-ok'} onClick={toggleModal}>DONE</button>
                                <button className={'wiki-btn-cancel'} onClick={closeModal}>Cancel</button>
                            </div>
                            <span className={'wiki-btn-close'} onClick={closeModal}></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}