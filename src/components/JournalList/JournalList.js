import { Counter } from "../Counter/couter";
import s from "../JournalList/JournalList.module.scss"

export const JournalList =({data, changeThreats, deleteFloss, saveChanges}) =>{


return( <div> 
<h2>My list</h2>
        <ul className={s.ul}>
          {data.map((item) => {
            return (
              <li  key={item.dmcNumber} id={item.dmcNumber}>
                <span style={{ backgroundColor: `${item.hex}`, border: "1px solid black" }}>
                  {item.hex?item.hex:"unknown"}{" "}
                </span>
                <span className={s.span}>{item.dmcNumber}</span>
                <span className={s.span}>{item.colorName}</span>
                <span className={s.span}>DMC</span>
                {
                  <Counter
                    card={item}
                    cardsArray={data}
                    changeThreats={changeThreats}
                  />
                }
                <button style={{ width: "fitContent", height: "20px" }} onClick={deleteFloss} >
                  Del
                </button>
                <span className={s.span}></span>
              </li>
            );
          })}
          <button onClick={saveChanges}>Save Changes</button>
        </ul>
        </div>)
}