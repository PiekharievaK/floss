import { Report } from "notiflix";
import { useState } from "react";
import { Block } from "notiflix";
import Button from "../../../Button";
import flosses from "../../../../Pages/ColorsPage/flosses.json";
import s from "./addFlossForm.module.scss";

const AddFlossForm = ({ AddThreads, onChange, clearThreed }) => {
  const [addActive, setAddActive] = useState(false);
  const [label, setLabel] = useState("DMC");
  const firm = document.getElementById("firm");
  const labels = Object.keys(flosses[0].labels).filter(
    (label) => label !== "Bestex" && label !== "BELKA" && label !== "Kirova"
  );
  const onRadioChange = (e) => {
    clearThreed();
    setLabel(e.target.value);
  };
  const addValidation = (e) => {
    e.preventDefault();
    if (
      firm.value === "DMC" ||
      firm.value === "Madeira" ||
      firm.value === "Anchor" ||
      firm.value === "Gamma"
    ) {
      Report.info(
        `You can't add it like ${firm.value}`,
        `${firm.value} floss have reserved numbers in our Data Base, if your number is not in our collection, and you shure that it is ${firm.value} please add it in lower case`
      );
      return;
    }

    AddThreads(e, label);
    console.log(e);
    e.target.reset();
    clearThreed();
  };

  return (
    <>
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
            {labels.map((item) => (
              <div className={s.radioButton} key={item}>
                <input
                  type={"radio"}
                  name="flossLabel"
                  value={item}
                  id={item}
                  onChange={onRadioChange}
                  checked={label === item}
                  className={`${s.radio} radio`}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
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
              <form
                onSubmit={(e) => {
                  addValidation(e);
                }}
                className={s.form}
              >
                <div className={s.inputBox}>
                  <input
                    type={"color"}
                    placeholder={"hex"}
                    name={"hex"}
                    onChange={onChange}
                    required
                    className={s.input}
                  ></input>{" "}
                  <label htmlFor={"hex"} className={s.inputLabel}>
                    select floss color
                  </label>
                </div>
                <div className={s.inputBox}>
                  <input
                    type={"search"}
                    placeholder={"number (3811)"}
                    name={"number"}
                    onChange={onChange}
                    required
                    className={s.input}
                  ></input>{" "}
                  <label htmlFor={"number"} className={s.inputLabel}>
                    floss number
                  </label>
                </div>
                <div className={s.inputBox}>
                  <input
                    type={"search"}
                    placeholder={"label (Dmc)"}
                    name={"label"}
                    onChange={onChange}
                    id={"firm"}
                    required
                    className={s.input}
                  ></input>{" "}
                  <label htmlFor={"label"} className={s.inputLabel}>
                    manufacture
                  </label>
                </div>
                <div className={s.inputBox}>
                  <input
                    type={"search"}
                    placeholder={"color (green)"}
                    name={"colorName"}
                    onChange={onChange}
                    required
                    className={s.input}
                  ></input>{" "}
                  <label htmlFor={"colorName"} className={s.inputLabel}>
                    color name
                  </label>
                </div>
                <div className={s.inputBox}>
                  <input
                    type={"number"}
                    placeholder={"count (multiple of 0.25)"}
                    name={"count"}
                    onChange={onChange}
                    step={0.25}
                    min={0.25}
                    required
                    className={s.input}
                  ></input>{" "}
                  <label htmlFor={"count"} className={s.inputLabel}>
                    quantity
                  </label>
                </div>
                <Button className={s.addButton}>Add to my list</Button>
              </form>
            )}
            {label !== "Other" && (
              <form
                onSubmit={(e) => {
                  AddThreads(e, label);
                  e.target.reset();
                }}
                className={s.form}
              >
                <div className={s.inputBox}>
                  <input
                    type={"search"}
                    placeholder={"number (3811)"}
                    name={"number"}
                    onChange={onChange}
                    required
                    className={s.input}
                  ></input>
                  <label htmlFor={"number"} className={s.inputLabel}>
                    floss number
                  </label>
                </div>
                <div className={s.inputBox}>
                  <input
                    type={"number"}
                    placeholder={"count (multiple of 0.25)"}
                    name={"count"}
                    step={0.25}
                    min={0.25}
                    onChange={onChange}
                    required
                    className={s.input}
                  ></input>
                  <label htmlFor={"count"} className={s.inputLabel}>
                    quantity
                  </label>
                </div>
                <Button className={s.addButton}>Add to my list</Button>
              </form>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AddFlossForm;
