import { useState } from "react"
import s from "./AddSchemaForm.module.scss"


export  const AddSchemaForm =({schemasData, AddSchema})=>{
const [name,  setName] = useState("")

const onSubmit= async(e) =>{
    e.preventDefault()
    const newData = [...schemasData, {_id: 3, name, flossesList: []}]
    await AddSchema(newData)
    setName("")
    console.log(schemasData);
}

    return <>
    <form onSubmit={onSubmit}>
<input type="text" placeholder="schema name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
<button type="submit"> Add schema</button>      
    </form>
    </>
}