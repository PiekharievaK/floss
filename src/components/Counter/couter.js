// import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";
import s from "./counter.module.scss"

export const Counter = ({
  card,
  setEditMode,
  changeThreats,
  updateOneFloss

}) => {
  const [counterValue, setCounterValue] = useState(card.count);
  // const [newArray, setNewArray] = useState(cardsArray);

  const step = 1;


 
useEffect(()=>{
  
  const newThreadsData = {...card, count: counterValue }
  // const newArray = cardsArray.map(item=>{if ( item.dmcNumber=== card.dmcNumber){return newThreadsData} else return item })

  changeThreats(newThreadsData)
  
}, [counterValue])


  const increment = () => {
    setCounterValue(prevState => (Number(prevState) + step));

  };

  const decrement = () => {

    setCounterValue(prevState => prevState - step);

  };

  return (
    <>
     
      <div 
      className={s.counterBox} 
      id="counter">
        <div 
        // className={s.counter_title}
        >count: </div>
        <div
           className={s.buttonBox}
         >
          <button
            className={s.changeButton}
            type="button"
            data-action="decrement"
            disabled={counterValue===0? true: false}
            onClick={decrement}
          >
            -
          </button>
          <span 
          // className={s.counter_total} 
          id="value">
           { ` ${counterValue} ` }
          </span>
          <button
            className={s.changeButton}
            type="button"
            data-action="increment"
            onClick={increment}
          >
            +
          </button>
        </div>
        <button className={s.saveButton} onClick={()=>{updateOneFloss(card._id, counterValue); setEditMode()}}>Save changes</button>
      </div>

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


