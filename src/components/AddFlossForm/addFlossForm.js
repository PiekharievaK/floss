import { Notify, Report } from "notiflix";
import { useState } from "react";
import Button from "../Button";
import s from "./addFlossForm.module.scss";

const AddFlossForm = ({ AddThreads, onChange, clearThreed }) => {
  const [addActive, setAddActive] = useState(false);
  const [label, setLabel] = useState("DMC");
  const firm = document.getElementById("firm");
  const onRadioChange = (e) => {
    clearThreed();
    setLabel(e.target.value);
  };

  const addValidation = (e) => {
    e.preventDefault();
    if (firm.value === "DMC") {
      Report.info(
        "You can`t add it like 'DMC'",
        "DMC floss have reserved numbers in our Data Base, if your number is not in our collection, and you shure that it is 'DMC' please add it like `dmc`"
      );
      return;
    }
    AddThreads(e);
  };

  return (
    <div>
      <Button
        className={s.openFormButton}
        onClick={() => setAddActive(!addActive)}
      >
        <span>
          {" "}
          {!addActive ? "Add new floss to my collection" : "Cancel it"}{" "}
        </span>
      </Button>

      {addActive && (
        <>
          <div className={s.radioBox}>
            <div className={s.radioButton}>
              <input
                type={"radio"}
                name="flossLabel"
                value="DMC"
                id="DMC"
                onChange={onRadioChange}
                checked={label === "DMC"}
                className={`${s.radio} radio`}
              />
              <label htmlFor="DMC">DMC</label>
            </div>
            <div className={s.radioButton}>
              <input
                type={"radio"}
                name="flossLabel"
                value="Other"
                id="Other"
                onChange={onRadioChange}
                checked={label === "Other"}
                className={`${s.radio} radio`}
              />
              <label htmlFor="Other">Other</label>
            </div>
          </div>
          <div>
            {label === "Other" && (
              <form onSubmit={addValidation} className={s.form}>
                <input
                  type={"color"}
                  placeholder={"hex"}
                  name={"hex"}
                  onChange={onChange}
                  required
                  className={s.input}
                ></input>
                <input
                  type={"search"}
                  placeholder={"number"}
                  name={"number"}
                  onChange={onChange}
                  required
                  className={s.input}
                ></input>
                <input
                  type={"search"}
                  placeholder={"label"}
                  name={"label"}
                  onChange={onChange}
                  id={"firm"}
                  required
                  className={s.input}
                ></input>
                <input
                  type={"search"}
                  placeholder={"color"}
                  name={"colorName"}
                  onChange={onChange}
                  required
                  className={s.input}
                ></input>
                <input
                  type={"number"}
                  placeholder={"count"}
                  name={"count"}
                  onChange={onChange}
                  min={1}
                  required
                  className={s.input}
                ></input>
                <Button className={s.addButton}>Add to my list</Button>
              </form>
            )}
            {label === "DMC" && (
              <form onSubmit={AddThreads} className={s.form}>
                <input
                  type={"search"}
                  placeholder={"number"}
                  name={"number"}
                  onChange={onChange}
                  required
                  className={s.input}
                ></input>
                <input
                  type={"number"}
                  placeholder={"count"}
                  name={"count"}
                  onChange={onChange}
                  required
                  className={s.input}
                ></input>
                <Button className={s.addButton}>Add to my list</Button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AddFlossForm;
