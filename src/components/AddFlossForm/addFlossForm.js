import { useState } from "react";

const AddFlossForm = ({AddThreads, onChange, clearThreed }) => {
  const [addActive, setAddActive] = useState(false);
  const [label, setLabel] = useState("");

  const onRadioChange = (e) => {
    clearThreed()
    setLabel(e.target.value);
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
          />
          <label for="DMC">DMC</label>
          <input
            type={"radio"}
            name="flossLabel"
            value="Other"
            id="Other"
            onChange={onRadioChange}
          />
          <label for="Other">Other</label>
          <div>
            {label === "Other" && (
              <form onSubmit={AddThreads}>
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
