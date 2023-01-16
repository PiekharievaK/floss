import { useState } from "react";
import s from "./AddSchemaForm.module.scss";

export const AddSchemaForm = ({ schemasData, addSchema }) => {
  const [name, setName] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();

    addSchema({ name });

    setName("");
    console.log(schemasData);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="schema name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        ></input>
        <button type="submit"> Add schema</button>
      </form>
    </>
  );
};
