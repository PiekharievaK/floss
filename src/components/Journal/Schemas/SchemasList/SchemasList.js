import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { ImageCropper } from "../../../ImageCropper/ImageCropper";
import s from "./SchemasList.module.scss"

export const SchemasList= ({schemasData, AddSchemaFloss, AddImage}) =>{

    // const [label, setLabel] = useState("DMC");
    const [number, setNumber] = useState("");
    const [count, setCount] = useState("");
    const [selectedFile, setSelectedFile]= useState("")
    const [uploaded, setUploaded] = useState({})
    const [croppedImage, setCroppedImage] = useState(null)


useEffect(()=>{
  const formData = new FormData()
  formData.append("image", selectedFile)
console.log(formData);
const binaryData = []

binaryData.push(selectedFile)

const url = URL.createObjectURL(new Blob(binaryData, {type: "	application/octet-stream"}))
// console.log(url);
setUploaded(url)

}, [selectedFile])


useEffect(()=>{
  console.log(croppedImage);
  console.log(schemasData);
  
}, [croppedImage])



const filePicker = useRef(null)

    const handleChange = ({target}) => {
        switch (target.name) {
          case "selectedFile":
            return setSelectedFile(target.files[0]);
          case "number":
            return setNumber(target.value);
          case "count":
            return setCount(target.value);
          default:
            return;
        }
      };

const AddFloss = async(e) =>{
  
  e.preventDefault()
  console.log(e.target[0].options.selectedIndex, e.target[0].options[e.target[0].options.selectedIndex].innerHTML
    );
    const label = e.target[0].options[e.target[0].options.selectedIndex].innerHTML
    await AddSchemaFloss(e, label, number, count)
    setNumber("")
    setCount("")
    e.target.reset()

}

const pickFile=()=>{
  // ссылка на видео отправки файла
  // https://www.youtube.com/watch?v=xPRA4jixCX8&ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9

// ссылка на видео получения файла 
// https://www.youtube.com/watch?v=9tA-wuuLkPw&ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9


  filePicker.current.click()
}
const AddSchemaImage = (e) =>{
  console.log(e);
  const formData = new FormData()
  formData.append("image", croppedImage.split(",").pop())
  formData.append("name", `schema-${e.target.name}-image`)
  
// console.log(formData);
// const binaryData = []
// // чтоб отправить надо через формдату
// binaryData.push(formData)
// // чтоб сразу посмотреть не через фом дату а напрямую 
// binaryData.push(croppedImage)

// const url = URL.createObjectURL(new Blob(binaryData, {type: "	application/octet-stream"}))
// console.log(url);

AddImage(e, e.target.id, formData)

}

    console.log("Schema mount");
    return (<div>{schemasData.length>0?
    <div className={s.cardBox}>
    {schemasData.map((schema, idx) => {
        return (<div className={s.card}> <h4>name: {schema.name}</h4> 
        {schema.image && schema.image.urlPreview.trim() !== ""  &&  
        <img src={schema.image.urlPreview} alt="img" onClick={(e)=>{console.log(e.target.style.width); e.target.style.width = e.target.style.width === "50px" ?"300px": "50px"}} style={{width: "50px", cursor: "pointer"}}></img>}
        {selectedFile  &&
       <ImageCropper image={uploaded} setCroppedImage={setCroppedImage} setSelectedFile={setSelectedFile}/>}
        <div className={s.addForm}> 
        <form onSubmit={AddFloss} id={schema.name}>
            <select name="label" id="label" onChange={handleChange} >
                <option name="label" value="DMC" >DMC</option>
                 <option name="Amhor" value="Amhor">Amhor</option>
                 <option name="Other" value="Other">Other</option>
            </select>
            <input type="string" placeholder="number" name="number"  onChange={handleChange} required className={s.input}></input>
            <input type="number" placeholder="count" name="count" onChange={handleChange} required className={s.input}></input> 
            <button type="submit">add new floss</button>
            </form> 
            <button onClick={pickFile} id="file" className="file">Pick schema image</button>
            <button  id={schema._id} name={schema.name}onClick={AddSchemaImage}>{schema.image?.urlPreview.trim()?"Change image":"Add image"}</button>
            <input type="file" name="selectedFile" accept=".png, .jpg" onChange={handleChange} className="visually-hidden" ref={filePicker}></input></div>
        <div className={s.flossesBox}>
         {schema.flossesList?.map(item=>{
            return (<div ><span>{item.label}</span><ul className={s.flossesList}>{item.flosses.map(floss=>{
                return (<li className={s.item} key={floss.number + floss.count}> number:<span>{floss.number}</span> count:<span>{floss.count}</span></li>)
            })}</ul></div>)
        })} </div>
        </div>)
    })}</div> : <h3> No schemas yet</h3>
  }</div>
    )
}