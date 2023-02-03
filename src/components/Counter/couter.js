import { useState, useEffect } from "react";
import Button from "../Button";
import s from "./counter.module.scss";

export const Counter = ({
  card,
  setEditMode,
  changeThreats,
  updateOneFloss,
}) => {
  const [counterValue, setCounterValue] = useState(card.count);

  const step = 1;

  useEffect(() => {
    const newThreadsData = { ...card, count: counterValue };
    changeThreats(newThreadsData);
  }, [counterValue]);

  const increment = () => {
    setCounterValue((prevState) => Number(prevState) + step);
  };

  const decrement = () => {
    setCounterValue((prevState) => prevState - step);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateOneFloss(card._id, counterValue);
    setEditMode();
  };

  return (
    <>
      <form onSubmit={onSubmit} className={s.counterBox} id="counter">
        <div
        // className={s.counter_title}
        >
          count:{" "}
        </div>
        <div className={s.buttonBox}>
          <Button
            className={s.changeButton}
            type="button"
            data-action="decrement"
            disabled={counterValue === 0 ? true : false}
            onClick={decrement}
          >
            -
          </Button>
          <input
            type={"number"}
            placeholder={"count"}
            name={"count"}
            step={0.25}
            value={counterValue}
            min={0.25}
            onChange={(e) => setCounterValue(e.target.value)}
            className={s.input}
          ></input>
          <Button
            className={s.changeButton}
            type="button"
            data-action="increment"
            onClick={increment}
          >
            +
          </Button>
        </div>
        <Button type={"submit"} className={s.saveButton}>
          Save <span className={s.mobileHide}>changes</span>
        </Button>
      </form>
    </>
  );
};

// Counter.propTypes = {
//   EditColName: PropTypes.func,
//   cardsArray: PropTypes.array,
//   card: PropTypes.object,
//   summary: PropTypes.number,
//   counter: PropTypes.number,
// };
