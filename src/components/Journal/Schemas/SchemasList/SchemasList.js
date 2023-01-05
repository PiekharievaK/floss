import { useState, useRef } from "react";
import s from "./SchemasList.module.scss"

export const SchemasList= ({schemasData, AddSchemaFloss}) =>{

    // const [label, setLabel] = useState("DMC");
    const [number, setNumber] = useState("");
    const [count, setCount] = useState("");
    const [selectedFile, setSelectedFile]= useState("")
    // const [uploaded, setUploaded] = useState({})

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
  // ссылка на видео
  // https://www.youtube.com/watch?v=xPRA4jixCX8&ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9
  filePicker.current.click()
}
const AddSchemaImage = () =>{
  console.log(selectedFile);
  const formData = new FormData()
  formData.append("image", selectedFile)
console.log(formData);
  // fetch ("http//localhost:3002", {method: "POST", body: formData})
  // axios.post("/schemas/image", formData)
}

    console.log("Schema mount");
    return (<div>{schemasData.length>0?
    <div className={s.cardBox}>
    {schemasData.map((schema) => {
        return (<div className={s.card}> <h4>name: {schema.name}</h4> 
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
            <button onClick={pickFile}>Pick schema image</button>
            <button onClick={AddSchemaImage}>Add image</button>
            <input type="file" name="selectedFile" accept=".png, .jpg" onChange={handleChange} className="visually-hidden" ref={filePicker}></input></div>
        <div className={s.flossesBox}>
         {schema.flossesList.map(item=>{
            return (<div ><span>{item.label}</span><ul className={s.flossesList}>{item.flosses.map(floss=>{
                return (<li className={s.item} key={floss.number + floss.count}> number:<span>{floss.number}</span> count:<span>{floss.count}</span></li>)
            })}</ul></div>)
        })} </div>
        </div>)
    })}</div> : <h3> No schemas yet</h3>
  }</div>
    )
}