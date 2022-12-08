import s from "../JournalPage/JournalPage.module.scss";
import { journalData } from "./journalData";
import { useEffect, useState } from "react";
import { Counter } from "../../components/Counter/couter";

export const JournalPage = () => {
  const [newThreadsArr, setNewThreadsArr] = useState([]);
  const [newThread, setNewThread] = useState({});

  const onChange = (e) => {
    setNewThread({ ...newThread, [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  const AddThreads = (e) => {
    e.preventDefault();
    if (newThreadsArr.find((item) => item.dmcNumber === newThread.dmcNumber)) {
      window.alert(
        "You had this threads already, please find it and change count"
      );
      console.log(newThreadsArr);
      return;
    }
    console.log(newThread);
    journalData.push(newThread);
    setNewThreadsArr((prevState) => [...prevState, newThread]);
  };

  // const deleteFloss =(e)=>{
  //   // найти по номеру и удалить объект
  //   // newThread.push(e.target.dmcNumber)

  // }

  const saveChanges =() =>{
    console.log(newThreadsArr);
    window.alert(JSON.stringify(newThreadsArr))
  }
  const changeThreats = (data) => {
    const changeIndex = newThreadsArr.findIndex(
      (item) => item.dmcNumber === data.dmcNumber
    );

    console.log(changeIndex);
    if (changeIndex >= 0) {
      const newArray = [...newThreadsArr];
      newArray[changeIndex] = data;
      setNewThreadsArr(newArray);
    } else setNewThreadsArr([...newThreadsArr, data]);
  };

  useEffect(() => {
    console.log(newThreadsArr);
  }, [newThreadsArr]);

  const data = journalData;

  return (
    <div>
      <h1>JOURNAL</h1>
      <div>
        <form>
          <input type={"search"} placeholder={"search by numder"}></input>
          <button style={{ width: "fitContent", height: "20px" }}>find</button>
        </form>
      </div>
      <div>
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
            name={"dmcNumber"}
            onChange={onChange}
            required
          ></input>
          <input
            type={"search"}
            placeholder={"label"}
            name={"colorName"}
            onChange={onChange}
            required
          ></input>
          <input
            type={"search"}
            placeholder={"color"}
            name={"color"}
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
      </div>
      <div>
        <h2>My list</h2>
        <ul className={s.ul}>
          {data.map((item) => {
            return (
              <li>
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
                <button style={{ width: "fitContent", height: "20px" }}>
                  Del
                </button>
                <span className={s.span}></span>
              </li>
            );
          })}
          <button onClick={saveChanges}>Save Changes</button>
        </ul>
      </div>
    </div>
  );
};
