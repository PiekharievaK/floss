// import s from "../JournalPage/JournalPage.module.scss";
import journalData from "./journalData";
import { useEffect, useState } from "react";
import { JournalList } from "../../components/JournalList/JournalList";

export const JournalPage = () => {
  const [newThreadsArr, setNewThreadsArr] = useState([]);
  const [newThread, setNewThread] = useState({});
  const [shownFloss, setShownFloss] = useState(journalData)

  
  useEffect(() => {
    console.log(newThreadsArr);
  }, [newThreadsArr]);
  
  const onChange = (e) => {
    setNewThread({ ...newThread, [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  const AddThreads = (e) => {
    e.preventDefault();
    console.log(journalData, journalData.find((item) => item.dmcNumber === newThread.dmcNumber));
    if (journalData.find((item) => item.dmcNumber === newThread.dmcNumber) ) {
      console.log(journalData, journalData.find((item) => item.dmcNumber === newThread.dmcNumber));
      window.alert(
        "You had this threads already, please find it and change count"
      );
      console.log(newThreadsArr);
      return;
    }
    console.log(newThread);
    journalData.push(newThread);
    setNewThreadsArr(prevState => [...prevState, newThread]);
  };

const onSearchFloss = (e) =>{

  if(e.target.value.length === 0){
    setShownFloss(journalData)
  return }
  console.log(journalData, e.target.value );
  const searchFloss = journalData.filter(item => item.dmcNumber.includes(e.target.value))
  console.log(searchFloss);
  setShownFloss(searchFloss)
  return searchFloss
}

  const deleteFloss =(e)=>{
    // надо обновить рендеринг после удаления
    console.log(e.currentTarget);
    console.log(e.target.parentNode);
    // if(e.target === `button`){
   const deleteIdx = journalData.findIndex(item => item.dmcNumber === e.target.parentNode.id)

   journalData.splice( deleteIdx,1)
    // }
    return
  }

  const saveChanges =() =>{
    console.log(newThreadsArr);
    window.alert(JSON.stringify(newThreadsArr))
  }
  const changeThreats = (journalData) => {
    const changeIndex = newThreadsArr.findIndex(
      (item) => item.dmcNumber === journalData.dmcNumber
    );

    console.log(changeIndex);
    if (changeIndex >= 0) {
      const newArray = [...newThreadsArr];
      newArray[changeIndex] = journalData;
      setNewThreadsArr(newArray);
    } else setNewThreadsArr([...newThreadsArr, journalData]);
  };



  return (
    <div>
      <h1>JOURNAL</h1>
      <div>
        <form>
          <input type={"search"} placeholder={"search by numder"} onChange={onSearchFloss}></input>
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
      {<JournalList data={shownFloss} changeThreats={changeThreats} deleteFloss={deleteFloss} saveChanges={saveChanges}/>}
      {/* <div> */}
        {/* <h2>My list</h2>
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
        </ul> */}
      {/* </div> */}
    </div>
  );
};
