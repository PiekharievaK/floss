import getCroppedImg from "./cropImage.js"
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import sprite from "../../images/sprite.svg"
import s from "./cropper.module.scss"


export const ImageCropper = ({image, setCroppedImage, setSelectedFile}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation]= useState(0)
  // const [croppedArea, setCroppedArea] = useState(null);
  const [croppAreaPixels, setCroppAreaPixels ] = useState(null)

  const onRotate = () =>{
    const step = 90
    setRotation((Number(rotation)-step))
  }

const saveCrop = async() =>{
  const croppedImageUrl = await getCroppedImg(image, croppAreaPixels, rotation)
  setCroppedImage(croppedImageUrl)
  setSelectedFile(null)
}

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
    console.log(croppedArea);
    setCroppAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <div className={s.cropperWrapper}>
    < div className={s.cropperBox} >
    <Cropper
      image = {image}
      crop={crop}
      zoom={zoom}
      rotation={rotation}
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      onRotationChange={setRotation}
     />
    </div>
     <div className={s.controlls}>
     <div>
     <svg  className={s.svg}><use href={`${sprite}#icon-zoom-out`}></use></svg>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value)
          }}
          className={s.zoomRange}
        />
             <svg  className={s.svg}style={{transform: "scaleX(-1)"}}><use href={`${sprite}#icon-zoom-in`}></use></svg>
</div>
        <div className={s.rotationBox}>
        <button  type="button" 
        
          aria-label="Rotate right"
          onClick={(e) => {
            setRotation((Number(rotation)+90))
          }}><svg  className={s.svg}><use href={`${sprite}#icon-rotate`}></use></svg></button>
          <button  type="button" 
          aria-label="Rotate left"
          onClick={onRotate} ><svg  className={s.svg}style={{transform: "scaleX(-1)"}}><use href={`${sprite}#icon-rotate`}></use></svg></button>
     
    <button onClick={saveCrop} className={s.button}>Crop Complete</button>
    </div>
      </div>
    </div>
  )
}

