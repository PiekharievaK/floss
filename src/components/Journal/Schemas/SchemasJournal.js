import { AddSchemaForm } from "./AddSchemaForm/AddSchemaForm"
import { SchemasList } from "./SchemasList/SchemasList"
import schemasData from "./SchemaList.json";
import { useEffect, useState } from "react";

export const SchemasJournal = () =>{
    const [schemas, setSchemas] = useState(schemasData)
    useEffect(()=>{}, [schemas])

    const AddSchema = (data)=>{
    setSchemas(data)
}
const AddSchemaFloss = (e, label, number, count) =>{
    const schemaIdx = schemas.findIndex(schema => schema.name === e.target.id)
    const currentLableIdx = schemas[schemaIdx].flossesList.findIndex( flosses => flosses.label === label)

    const currentSchema = schemas[schemaIdx]
    const currentLableFlosses = currentSchema.flossesList[currentLableIdx]

    if(!currentLableFlosses){
        schemas[schemaIdx].flossesList= currentSchema.flossesList.length > 0?[...currentSchema.flossesList, {label, flosses:[{number, count}]} ]: [{label, flosses:[{number, count}]} ]
        console.log(currentSchema);
        setSchemas(schemas) 
        console.log(schemas);
      return
    } 
    currentLableFlosses.flosses = ([...currentLableFlosses.flosses, {number, count}])
    setSchemas(schemas) 
    console.log(schemas);
    
}



    return <>
    <AddSchemaForm schemasData={schemas} AddSchema={AddSchema}/>
    <SchemasList schemasData={schemas} AddSchemaFloss={AddSchemaFloss}/>
    </>

}