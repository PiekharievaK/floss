import { AddSchemaForm } from "./AddSchemaForm/AddSchemaForm";
import { SchemasList } from "./SchemasList/SchemasList";
// import schemasData from "./SchemaList.json";
import { useEffect, useState } from "react";
import operations from "../../../helpers/journalOperations";

export const SchemasJournal = ({ user }) => {
  const [schemas, setSchemas] = useState([]);
  const { getAllSchemas, addNewSchema, addSchemaImage, addSchemaFloss, deleteSchemaFloss, deleteSchema } = operations;
  const collectionId = user.collectionId

  useEffect(() => {
    getAllSchemas(collectionId, setSchemas);
  }, []);

  const addSchema = async(schema) => {
    await addNewSchema(collectionId, schema);
   await getAllSchemas(collectionId, setSchemas)
  };
const deleteOneSchema = async (schemaId) =>{
    deleteSchema(collectionId, schemaId)

}
  const AddFloss = async(e, floss) => {
await addSchemaFloss(collectionId, e.target.id, floss )

    // const schemaIdx = schemas.findIndex(
    //   (schema) => schema.name === e.target.id
    // );
    // const currentLableIdx = schemas[schemaIdx].flossesList.findIndex(
    //   (flosses) => flosses.label === label
    // );

    // const currentSchema = schemas[schemaIdx];
    // const currentLableFlosses = currentSchema.flossesList[currentLableIdx];

    // if (!currentLableFlosses) {
    //   schemas[schemaIdx].flossesList =
    //     currentSchema.flossesList.length > 0
    //       ? [
    //           ...currentSchema.flossesList,
    //           { label, flosses: [{ number, count }] },
    //         ]
    //       : [{ label, flosses: [{ number, count }] }];
    //   console.log(currentSchema);
    //   setSchemas(schemas);
    //   console.log(schemas);
    //   return;
    // }
    // currentLableFlosses.flosses = [
    //   ...currentLableFlosses.flosses,
    //   { number, count },
    // ];
    // setSchemas(schemas);
    // console.log(schemas);
  };

  const AddImage = (e, schemaId, image) => {
    // console.log(schemas[schemaIdx].image.urlPreview);
    // schemas[schemaIdx].image
    //   ? (schemas[schemaIdx].image.urlPreview = image)
    //   : (schemas[schemaIdx].image = {
    //       urlPreview: image,
    //       urlFull: "",
    //       deleteUrl: "",
    //     });
    // console.log(schemas[schemaIdx].image.urlPreview);
    addSchemaImage(collectionId, schemaId, image)
    // setSchemas(schemas);
    
  };

  const deleteFloss = async(schemaId, label, flossId)=>{
    deleteSchemaFloss(collectionId, schemaId, label, flossId)
  }

  return (
    <>
      <AddSchemaForm schemasData={schemas} user={user} addSchema={addSchema} />
      <SchemasList
        schemasData={schemas}
        AddSchemaFloss={AddFloss}
        AddImage={AddImage}
        deleteSchemaFloss={deleteFloss}
        deleteOneSchema={deleteOneSchema}
      />
    </>
  );
};
