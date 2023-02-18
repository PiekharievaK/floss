import { useState } from "react";
import { Block } from "notiflix";
import s from "./AddSchemaForm.module.scss";

export const AddSchemaForm = ({ schemasData, addSchema }) => {
  const [name, setName] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    Block.standard(`.${e.target.classList[0]}`);
    addSchema({ name });
    Block.remove(`.${e.target.classList[0]}`);
    setName("");
    console.log(schemasData);
  };

  return (
    <>
      <form onSubmit={onSubmit} className={s.form}>
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
