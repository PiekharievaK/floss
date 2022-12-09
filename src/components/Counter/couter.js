// import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";

export const Counter = ({
  card,
  cardsArray,
  changeThreats

}) => {
  const [counterValue, setCounterValue] = useState(card.count);
  // const [newArray, setNewArray] = useState(cardsArray);

  const step = 1;


 
useEffect(()=>{
  
  const newThreadsData = {...card, count: counterValue }
  // const newArray = cardsArray.map(item=>{if ( item.dmcNumber=== card.dmcNumber){return newThreadsData} else return item })

  changeThreats(newThreadsData)
  
}, [counterValue])

  // useEffect(() => {
  //   localStorage.setItem('arrayTotal', JSON.stringify(total));
  //   localStorage.setItem('counterValue', JSON.stringify(counterValue));
  //   localStorage.setItem('cardsArray', JSON.stringify(newCardsArray));
  // }, [total, newTotal, counterValue, newCardsArray]);

  const increment = () => {
    setCounterValue(prevState => (Number(prevState) + step));
    // setTotal(prevState => prevState + Number(card.price));
    // setNewTotal(Number(localStorage.getItem('Summary')) + Number(card.price));

    // const cardD = { ...card, counter: counterValue + step };

    // EditColName(cardD);
  };

  const decrement = () => {

    setCounterValue(prevState => prevState - step);
    // setTotal(prevState => prevState - Number(card.price));
    // setNewTotal(Number(localStorage.getItem('Summary')) - Number(card.price));
    // const cardD = { ...card, counter: counterValue - step };
    // EditColName(cardD);
  };

  return (
    <>
     
      <div 
      style={{display: "inline-flex"}}
      // className={s.counter_cell} 
      id="counter">
        <div 
        // className={s.counter_title}
        >Кількість штук : </div>
        <div
          //  className={s.counter_holder}
         >
          <button
            // className={s.counter_button_minus}
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
            // className={s.counter_button_plus}
            type="button"
            data-action="increment"
            onClick={increment}
          >
            +
          </button>
        </div>
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


