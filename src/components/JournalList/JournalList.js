import { useEffect, useState } from "react";
import { Counter } from "../Counter/couter";
import s from "../JournalList/JournalList.module.scss";

export const JournalList = ({
  data,
  onSearchFloss,
  changeThreats,
  deleteOneFloss,
  saveChanges,
  updateOneFloss,
}) => {
  const [filter, setFilter] = useState("All");
  const [filteredFloss, setFilteredFloss] = useState(data);

  const [editMode, setEditMode] = useState("");

  useEffect(() => {
    setFilteredFloss(data);
    filterFloss(filter);
  }, [data]);

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
  };

  const edit = (e) => {
    setEditMode(e.target?.parentNode?.id ? e.target.parentNode.id : {});
  };

  return (
    <div>
      <h2>My list</h2>
      <div>
        <form>
          <input
            type={"search"}
            placeholder={"search by number or color name"}
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
          id="All-List"
          checked={filter === "All"}
          onChange={onFilterChange}
        />
        <label htmlFor="All-List">All</label>
        <input
          type={"radio"}
          name="flossLabel"
          value="DMC"
          id="DMC-List"
          onChange={onFilterChange}
        />
        <label htmlFor="DMC-List">DMC</label>
        <input
          type={"radio"}
          name="flossLabel"
          value="Other"
          id="Other-List"
          onChange={onFilterChange}
        />
        <label htmlFor="Other-List">Other</label>
      </form>

      {filteredFloss.length > 0 ? (
        <ul className={s.ul}>
          {filteredFloss.map((item) => {
            return (
              <li key={item._id} id={item._id}>
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
                {item._id !== editMode && (
                  <span>
                    {"Кількість штук: "}
                    {item.count}
                  </span>
                )}
                {item._id !== editMode ? (
                  <button
                    style={{ width: "fitContent", height: "20px" }}
                    onClick={edit}
                  >
                    Edit
                  </button>
                ) : (
                  <span>
                    <Counter
                      card={item}
                      cardsArray={filteredFloss}
                      changeThreats={changeThreats}
                      updateOneFloss={updateOneFloss}
                      setEditMode={setEditMode}
                    />
                    <button
                      onClick={() => {
                        deleteOneFloss(item._id);
                      }}
                    >
                      Del
                    </button>{" "}
                    <button onClick={edit}>Close changes</button>
                  </span>
                )}
                <span className={s.span}></span>
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          <h3>no flosses yet</h3>
        </>
      )}
    </div>
  );
};
