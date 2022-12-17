import { useEffect, useState } from "react";
import { Counter } from "../Counter/couter";
import Button from "../Button";
import Section from "../Section";
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
    <div className={s.box}>
      <h2>My list</h2>
      <div className={s.formBox}>
        <input
          type={"search"}
          placeholder={"search by number or color name"}
          onChange={onSearchFloss}
          className={s.searchInput}
        ></input>
        {/* <button  className={s.findButton} style={{ width: "fitContent", height: "20px" }}>find</button> */}
      </div>
      <div className={s.filterBox}>
        <form className={s.filterForm}>
          <div className={s.radioBox}>
            <input
              type={"radio"}
              name="flossLabel"
              value="All"
              id="All-List"
              checked={filter === "All"}
              onChange={onFilterChange}
              className={`${s.radioBotton} radio`}
            />
            <label htmlFor="All-List" className={s.inputLabel}>
              All
            </label>
          </div>
          <div className={s.radioBox}>
            <input
              type={"radio"}
              name="flossLabel"
              value="DMC"
              id="DMC-List"
              onChange={onFilterChange}
              className={`${s.radioBotton} radio`}
            />
            <label htmlFor="DMC-List" className={s.inputLabel}>
              DMC
            </label>
          </div>
          <div className={s.radioBox}>
            <input
              type={"radio"}
              name="flossLabel"
              value="Other"
              id="Other-List"
              onChange={onFilterChange}
              className={`${s.radioBotton} radio`}
            />
            <label htmlFor="Other-List">Other</label>
          </div>
        </form>
      </div>

      <Section>
        {filteredFloss.length > 0 ? (
          <ul className={s.list}>
            <li key={1} className={s.item}>
              <div className={`${s.div} ${s.hexColor}`}>Color</div>
              <div className={`${s.div} ${s.number}`}>Number</div>
              <div className={`${s.div} ${s.colorName}`}>Color name</div>
              <div className={`${s.div} ${s.label}`}>Label</div>
              <div className={`${s.div} ${s.count}`}>Count</div>
              <div className={s.closeButton}></div>
            </li>
            {filteredFloss.map((item) => {
              return (
                <li key={item._id} id={item._id} className={s.item}>
                  <div
                    className={`${s.div} ${s.hexColor}`}
                    style={{
                      backgroundColor: `${item.hex}`,
                      border: "1px solid black",
                    }}
                  >
                    {/* {item.hex ? item.hex : "unknown"}{" "} */}
                  </div>
                  <div className={`${s.div} ${s.number}`}>{item.number}</div>
                  <div
                    className={`${s.div} ${s.colorName}`}
                    data-tooltip={item.colorName}
                  >
                    {item.colorName}
                  </div>
                  <div className={`${s.div} ${s.label}`}>{item.label}</div>
                  {item._id !== editMode && (
                    <div className={`${s.div} ${s.count}`}>
                      <span className={s.mobileHide}>{"count: "}</span>
                      {item.count}
                    </div>
                  )}
                  {item._id !== editMode ? (
                    <Button
                      className={s.editButton}
                      style={{ width: "fitContent", height: "20px" }}
                      onClick={edit}
                    >
                      Edit
                    </Button>
                  ) : (
                    <div className={s.counterBox}>
                      <div className={s.counter}>
                        <Counter
                          card={item}
                          cardsArray={filteredFloss}
                          changeThreats={changeThreats}
                          updateOneFloss={updateOneFloss}
                          setEditMode={setEditMode}
                        />
                        <>
                          <Button
                            className={s.deleteButton}
                            onClick={() => {
                              deleteOneFloss(item._id);
                            }}
                          >
                            Delete
                          </Button>{" "}
                          <Button onClick={edit} className={s.closeButton}>
                            Close <span className={s.mobileHide}>changes</span>
                          </Button>
                        </>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            <h3>no flosses yet</h3>
          </>
        )}
      </Section>
    </div>
  );
};
