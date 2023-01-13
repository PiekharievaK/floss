import { AddSchemaForm } from "./AddSchemaForm/AddSchemaForm";
import { SchemasList } from "./SchemasList/SchemasList";
// import schemasData from "./SchemaList.json";
import { useEffect, useState } from "react";
import operations from "../../../helpers/journalOperations";

export const SchemasJournal = ({ user }) => {
  const [schemas, setSchemas] = useState([]);
  const { getAllSchemas, addNewSchema, addSchemaImage, addSchemaFloss } = operations;

  useEffect(() => {
    getAllSchemas(user, setSchemas);
  }, []);

  const addSchema = async(schema) => {
    await addNewSchema(user, schema);
    getAllSchemas(user, setSchemas)
  };

  const AddFloss = async(e, floss) => {
await addSchemaFloss(user, e.target.id, floss )

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
    addSchemaImage(user, schemaId, image)
    // setSchemas(schemas);
    
  };

  return (
    <>
      <AddSchemaForm schemasData={schemas} user={user} addSchema={addSchema} />
      <SchemasList
        schemasData={schemas}
        AddSchemaFloss={AddFloss}
        AddImage={AddImage}
      />
    </>
  );
};
