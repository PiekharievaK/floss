import { Notify, Report } from "notiflix";
import { useState } from "react";

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
      <button onClick={() => setAddActive(!addActive)}>
        {!addActive ? "Add new floss to my collection" : "Cancel it"}
      </button>

      {addActive && (
        <>
          <input
            type={"radio"}
            name="flossLabel"
            value="DMC"
            id="DMC"
            onChange={onRadioChange}
            checked={label === "DMC"}
          />
          <label htmlFor="DMC">DMC</label>
          <input
            type={"radio"}
            name="flossLabel"
            value="Other"
            id="Other"
            onChange={onRadioChange}
          />
          <label htmlFor="Other">Other</label>
          <div>
            {label === "Other" && (
              <form onSubmit={addValidation}>
                <input
                  type={"color"}
                  placeholder={"hex"}
                  name={"hex"}
                  onChange={onChange}
                  required
                ></input>
                <input
                  type={"search"}
                  placeholder={"number"}
                  name={"number"}
                  onChange={onChange}
                  required
                ></input>
                <input
                  type={"search"}
                  placeholder={"label"}
                  name={"label"}
                  onChange={onChange}
                  id={"firm"}
                  required
                ></input>
                <input
                  type={"search"}
                  placeholder={"color"}
                  name={"colorName"}
                  onChange={onChange}
                  required
                ></input>
                <input
                  type={"number"}
                  placeholder={"count"}
                  name={"count"}
                  onChange={onChange}
                  min={1}
                  required
                ></input>
                <button style={{ width: "fitContent", height: "20px" }}>
                  Add to my list
                </button>
              </form>
            )}
            {label === "DMC" && (
              <form onSubmit={AddThreads}>
                <input
                  type={"search"}
                  placeholder={"number"}
                  name={"number"}
                  onChange={onChange}
                  required
                ></input>
                <input
                  type={"number"}
                  placeholder={"count"}
                  name={"count"}
                  onChange={onChange}
                  required
                ></input>
                <button style={{ width: "fitContent", height: "20px" }}>
                  Add to my list
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AddFlossForm;
