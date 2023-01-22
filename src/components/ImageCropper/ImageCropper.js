import { getCroppedImg } from "./cropImage.js";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import sprite from "../../images/sprite.svg";
import s from "./cropper.module.scss";

export const ImageCropper = ({ image, setCroppedImage, setSelectedFile }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  // const [croppedArea, setCroppedArea] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const saveCrop = async () => {
    const croppedImageUrl = await getCroppedImg(
      image,
      croppedAreaPixels,
      rotation
    );
    console.log(image, croppedAreaPixels, rotation);
    setCroppedImage(croppedImageUrl);
    setSelectedFile(null);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels);
    // setCroppedArea(croppedArea)
  }, []);

  const onRotate = (e) => {
    const step = 90;
    const rotationDeg =
      e.currentTarget.name === "increment" ? rotation + step : rotation - step;

    setRotation(rotationDeg);
    // setCroppAreaPixels({x: (croppAreaPixels.x ===0?croppAreaPixels.x: 0), y: (croppAreaPixels.y ===0?croppAreaPixels.y: 0), with: (croppAreaPixels.with ===100?croppAreaPixels.with: 100), height: (croppAreaPixels.height ===100?croppAreaPixels.height: 100)})
    // setCroppedArea({x: (croppedArea.x ===0?croppedArea.x: 0), y: (croppedArea.y ===0?croppedArea.y: 0), with: (croppedArea.with ===100?croppedArea.with: 100), height: (croppedArea.height ===100?croppedArea.height: 100)})
  };
  return (
    <div className={s.cropperWrapper}>
      <div className={s.cropperBox}>
        <Cropper
          image={image}
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
          <svg className={s.svg}>
            <use href={`${sprite}#icon-zoom-out`}></use>
          </svg>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(e.target.value);
            }}
            className={s.zoomRange}
          />
          <svg className={s.svg} style={{ transform: "scaleX(-1)" }}>
            <use href={`${sprite}#icon-zoom-in`}></use>
          </svg>
        </div>
        <div className={s.rotationBox}>
          <button
            type="button"
            name="decrement"
            aria-label="Rotate left"
            onClick={onRotate}
          >
            <svg className={s.svg} style={{ transform: "scaleX(-1)" }}>
              <use href={`${sprite}#icon-rotate`}></use>
            </svg>
          </button>
          <button
            type="button"
            name="increment"
            aria-label="Rotate right"
            onClick={onRotate}
          >
            <svg className={s.svg}>
              <use href={`${sprite}#icon-rotate`}></use>
            </svg>
          </button>
        </div>

        <button onClick={saveCrop} className={s.button}>
          Crop Complete
        </button>
      </div>
    </div>
  );
};
