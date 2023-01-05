import { useState } from "react";
import s from "./SchemasList.module.scss"

export const SchemasList= ({schemasData, AddSchemaFloss}) =>{

    // const [label, setLabel] = useState("DMC");
    const [number, setNumber] = useState("");
    const [count, setCount] = useState("");

    const handleChange = ({ target: { name, value } }) => {
        console.log( name, value);
        switch (name) {
          // case "label":
          //   console.log(value);
          //   return value===""?setLabel(value): setLabel("DMC") ;
          case "number":
            return setNumber(value);
          case "count":
            return setCount(value);
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
            <button type="submit">add new floss</button></form> </div>
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