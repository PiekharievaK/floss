import flosses from "../Pages/ColorsPage/flosses.json";
import { Confirm, Notify } from "notiflix";
import { useState, useEffect } from "react";

export const AddFlossForm = ({ AddFloss, schema, s }) => {
  const [number, setNumber] = useState("");
  const [count, setCount] = useState("");
  const [otherLabel, setOtherLabel] = useState("");
  const [labels, setLabels] = useState(
    Object.keys(flosses[0].labels).filter(
      (label) => label !== "Bestex" && label !== "BELKA" && label !== "Kirova"
    )
  );

  const addFloss = async (e) => {
    e.preventDefault();
    const label =
      e.target[0].options[e.target[0].options.selectedIndex].innerHTML;
    await AddFloss(e, { label, number, count });
    setNumber("");
    setCount("");
    e.target[1].value = "";
    e.target[2].value = "";
  };

  const handleChange = ({ target }) => {
    switch (target.name) {
      //   case "selectedFile":
      //     return setSelectedFile(target.files[0]);
      case "number":
        return setNumber(target.value);
      case "count":
        return setCount(target.value);
      case "label":
        return setOtherLabel(target.value);
      default:
        return;
    }
  };

  useEffect(() => {
    if (otherLabel !== "Other") {
      return;
    }
    Confirm.prompt(
      "You label will be added to list",
      "Please enter you label here",
      "",
      "Save",
      "Cancel",
      (e) => {
        setLabels([...labels, e]);
        setOtherLabel("");
        Notify.success(`Label ${e} was added to list you can choose it now`);
        return;
      },
      () => {
        setOtherLabel("");
        // setOther("")
        return;
      },
      {
        titleColor: "#80bdff",
        okButtonBackground: "#80bdff",
      }
    );

    // console.log(labels);
  }, [otherLabel]);

  return (
    <form onSubmit={addFloss} id={schema._id} className={s.form}>
      <select
        name="label"
        id="label"
        onChange={handleChange}
        className={s.input}
      >
        {labels.map((item) => (
          <option name={item} value={item} key={item}>
            {item}
          </option>
        ))}
        <option name="Other" value="Other">
          Other
        </option>
      </select>
      <input
        type="string"
        placeholder="number"
        name="number"
        onChange={handleChange}
        required
        className={s.input}
      ></input>
      <input
        type="number"
        placeholder="count"
        name="count"
        onChange={handleChange}
        required
        className={s.input}
      ></input>
      <button type="submit">add new floss</button>
    </form>
  );
};
