import getCroppedImg from "./cropImage.js"
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'

export const ImageCropper = ({image, setCroppedImage, setSelectedFile}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  // const [croppedArea, setCroppedArea] = useState(null);
  const [croppAreaPixels, setCroppAreaPixels ] = useState(null)

const saveCrop = async() =>{
  const croppedImageUrl = await getCroppedImg(image, croppAreaPixels)
  setCroppedImage(croppedImageUrl)
  setSelectedFile(null)
}

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
    console.log(croppedArea);
    setCroppAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <>
    <Cropper
      image = {image}
      crop={crop}
      zoom={zoom}
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
    <button onClick={saveCrop} style={{position: "absolute"}}>Crop Complete</button>
    </>
  )
}