import React, { useState, useRef, useEffect } from "react";
import Cropper from 'react-easy-crop';
// import 'react-image-crop/dist/ReactCrop.css';
import './ImageCrop.scss';

const radian = Math.PI / 180;
let mouseDownData;
let isMouseClicked = false;

export default function ImageEditing(modalOpen) {
    const [crop, setCrop] = useState({ x: 10, y: 10, width: 700, height: 280 });
    const [cropimg, setcropimg] = useState();
    const [zoom, setZoom] = useState(1);
    const [modal, setModal] = useState(true);
    const [rotateimg, setRotateImg] = useState(modalOpen.props);
    const [cropImage, setCropImage] = useState('');
    const [rotate, setRotate] = useState(0);
    const [aspectRatio, setAspectRatio] = useState(16 / 9);
    const topLeftRef = useRef();
    const topRightRef = useRef();
    const bottomLeftRef = useRef();
    const bottomRightRef = useRef();
    const [isRotate, setIsRotate] = useState(false)

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

    const handleMouseMoveForImageResizer = (e) => {
        // debugger
        e.preventDefault()
        if (isMouseClicked) {
            const height = 356;
            const width = 606
            let x = mouseDownData.clientX - e.clientX;
            let y = mouseDownData.clientY - e.clientY;
            const resizable = document.getElementById('resizable');
            // let x = resizable.clientWidth - e.clientX;
            // let y = resizable.clientHeight - e.clientY;
            // mouseDownData = e;

            // resizable.style.height = `calc(100% - ${y}px)`;
            if (resizable.clientHeight - y > height && resizable.clientHeight - y < height + 40) {
                // resizable.style.height = resizable.clientHeight - y + 'px';
                resizable.style.height = `calc(100% - ${y}px)`;
                const data = resizable.clientHeight - resizable.style.height;
                console.log('Height:', y)
            }
            if (resizable.clientWidth - x > width && resizable.clientWidth - x < width + 40) {
                // resizable.style.width = resizable.clientWidth - x + 'px';
                resizable.style.width = `calc(100% - ${x}px)`;
                const data = resizable.clientWidth - resizable.style.width;

                console.log('Width:', x)
            }
            if (y < 0) debugger
            if (y < 0 && y > -40 || x < 0 && x > -40) {
                let averageXY = Math.abs((y + x) / 2);
                let zoomVal = (averageXY / 20) + 1;
                setZoom(zoomVal)
            }
            if (y >= 0 && x >= 0) {
                setZoom(1);
            }


        }

    }

    const handleMouseUpForImageResizer = (e) => {
        e.preventDefault();
        isMouseClicked = false;
        window.removeEventListener('mousemove', handleMouseMoveForImageResizer);
        window.removeEventListener('mouseup', handleMouseUpForImageResizer);
    }

    const handleMouseDownForImageResizer = (e) => {
        // e.preventDefault();
        mouseDownData = e;
        isMouseClicked = true;

        window.addEventListener('mousemove', handleMouseMoveForImageResizer);
        window.addEventListener('mouseup', handleMouseUpForImageResizer);
    }

    useEffect(() => {
        // topLeftRef.current.addEventListener('mousedown', handleMouseDownForImageResizer);
        // topRightRef.current.addEventListener('mousedown', handleMouseDownForImageResizer);
        // bottomLeftRef.current.addEventListener('mousedown', handleMouseDownForImageResizer);
        // bottomRightRef.current.addEventListener('mousedown', handleMouseDownForImageResizer);

        return () => {
            // topLeftRef.current.removeEventListener('mousedown', handleMouseDownForImageResizer);
            // topRightRef.current.removeEventListener('mousedown', handleMouseDownForImageResizer);
            // bottomLeftRef.current.removeEventListener('mousedown', handleMouseDownForImageResizer);
            // bottomRightRef.current.removeEventListener('mousedown', handleMouseDownForImageResizer);
        }
    }, [rotateimg])

    const rotateImage = ()=>{

        setIsRotate(true)

        let angle = 0;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
    
        document.addEventListener("mousemove", (e) => {
    
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    
            console.log(angle)

        });
    }
    return (
        <div>
            {modal && (
                <div className={'wiki-modal'}>
                    <div onClick={setModal} className={'wiki-overlay'}></div>

                    <div className={'wiki-modal-content-crop'}>
                        <div className="resizable" id="resizable" >
                            <div className='resizers'>
                                <div className='resizer top-left' ref={topLeftRef} onMouseDown={handleMouseDownForImageResizer}></div>
                                <div className='resizer top-right' ref={topRightRef} onMouseDown={handleMouseDownForImageResizer}></div>
                                <div className='resizer bottom-left' ref={bottomLeftRef} onMouseDown={handleMouseDownForImageResizer}></div>
                                <div className='resizer bottom-right' ref={bottomRightRef} onMouseDown={handleMouseDownForImageResizer}></div>
                                <div className='resizer rotate' onMouseDown={rotateImage}></div>

                            </div>
                        </div>
                        <div className={'wiki-search-list'}>
                            {/* <div className="resizable"> */}

                            {/* </div> */}
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


                            <span className={'wiki-btn-close'} onClick={closeModal}></span>
                        </div>
                        <div className="wiki-save-content">
                            <button className="wiki-save" onClick={toggleModal}>save</button>
                            <button className="wiki-cancel" onClick={closeModal}>cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}