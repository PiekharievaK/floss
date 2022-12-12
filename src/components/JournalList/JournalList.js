import { useEffect, useState } from "react";
import { Counter } from "../Counter/couter";
import s from "../JournalList/JournalList.module.scss";

export const JournalList = ({
  data,
  onSearchFloss,
  changeThreats,
  deleteFloss,
  saveChanges,
}) => {
  const [filter, setFilter] = useState("All");
  const [filteredFloss, setFilteredFloss] = useState(data);

  const filterFloss = (value) => {
    if (value === "DMC") {
      setFilteredFloss(data.filter((item) => item.label === "DMC"));
      return;
    }
    if (value === "Other") {
      setFilteredFloss(data.filter((item) => item.label !== "DMC"));
      return;
    }
    if (value === "All") {
      setFilteredFloss(data);
      return;
    }
  };

  const onFilterChange = (e) => {
    if (e.target.value === filter) {
      return;
    }
    setFilter(e.target.value);
    filterFloss(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    setFilteredFloss(data);
    filterFloss(filter);
    console.log(filteredFloss, data);
  }, [data]);

  return (
    <div>
      <h2>My list</h2>
      <div>
        <form>
          <input
            type={"search"}
            placeholder={"search by numder"}
            onChange={onSearchFloss}
          ></input>
          <button style={{ width: "fitContent", height: "20px" }}>find</button>
        </form>
      </div>
      <form>
        <input
          type={"radio"}
          name="flossLabel"
          value="All"
          id="All"
          checked={filter === "All"}
          onChange={onFilterChange}
        />
        <label for="All">All</label>
        <input
          type={"radio"}
          name="flossLabel"
          value="DMC"
          id="DMC"
          onChange={onFilterChange}
        />
        <label for="DMC">DMC</label>
        <input
          type={"radio"}
          name="flossLabel"
          value="Other"
          id="Other"
          onChange={onFilterChange}
        />
        <label for="Other">Other</label>
      </form>

      {filteredFloss.length > 0 ? (
        <ul className={s.ul}>
          {filteredFloss.map((item) => {
            return (
              <li key={item.number} id={item.number}>
                <span
                  style={{
                    backgroundColor: `${item.hex}`,
                    border: "1px solid black",
                  }}
                >
                  {item.hex ? item.hex : "unknown"}{" "}
                </span>
                <span className={s.span}>{item.number}</span>
                <span className={s.span}>{item.colorName}</span>
                <span className={s.span}>{item.label}</span>
                {
                  <Counter
                    card={item}
                    cardsArray={filteredFloss}
                    changeThreats={changeThreats}
                  />
                }
                <button
                  style={{ width: "fitContent", height: "20px" }}
                  onClick={deleteFloss}
                >
                  Del
                </button>
                <span className={s.span}></span>
              </li>
            );
          })}
          <button onClick={saveChanges}>Save Changes</button>
        </ul>
      ) : (
        <>
          <h3>no flosses yet</h3>
        </>
      )}
    </div>
  );
};
