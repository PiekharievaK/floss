// import s from "../JournalPage/JournalPage.module.scss";
// import journalData from "./journalData";
import { useEffect, useState } from "react";
import { JournalList } from "../../components/JournalList/JournalList";
import operations from "../../helpers/journalOperations";
import AddFlossForm from "../../components/AddFlossForm/addFlossForm";

export const JournalPage = (user) => {
  const [userCollection, setUserCollection] = useState([]);
  const [newThreadsArr, setNewThreadsArr] = useState([]);
  const [newThread, setNewThread] = useState({});
  const [shownFloss, setShownFloss] = useState(userCollection);

  const { getAll, getFlossById, addNewFloss, deleteFloss } = operations;

  useEffect(() => {
    getAll(user, setUserCollection);
  }, []);

  useEffect(() => {
    setShownFloss(userCollection);
    console.log(userCollection);
  }, [userCollection]);

  const onChange = (e) => {
    setNewThread({ ...newThread, [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  const AddThreads = (e) => {
    e.preventDefault();
    
    addNewFloss(user, newThread)
  //   console.log(
  //     userCollection,
  //     userCollection.find((item) => item.umber === newThread.number)
  //   );
  //   if (userCollection.find((item) => item.umber === newThread.number)) {
  //     console.log(
  //       userCollection,
  //       userCollection.find((item) => item.umber === newThread.number)
  //     );
  //     window.alert(
  //       "You had this threads already, please find it and change count"
  //     );
  //     console.log(newThreadsArr);
  //     return;
  //   }
  //   console.log(newThread);
  //   userCollection.push(newThread);
  //   setNewThreadsArr((prevState) => [...prevState, newThread]);
  };

  const onSearchFloss = (e) => {
    if (e.target.value.length === 0) {
      setShownFloss(userCollection);
      return;
    }
    console.log(shownFloss, e.target.value);
    const searchFloss = userCollection.filter((item) =>
      item.number.includes(e.target.value)
    );
    console.log(searchFloss);
    setShownFloss(searchFloss);
    return searchFloss;
  };

  // const deleteFloss =(e)=>{
  //   // надо обновить рендеринг после удаления
  //   console.log(e.currentTarget);
  //   console.log(e.target.parentNode);
  //   // if(e.target === `button`){
  //  const deleteIdx = userCollection.findIndex(item => item.number === e.target.parentNode.id)

  //  userCollection.splice( deleteIdx,1)
  //   // }
  //   return
  // }

  const saveChanges = () => {
    console.log(newThreadsArr);
    window.alert(JSON.stringify(newThreadsArr));
  };
  const changeThreats = (journalData) => {
    const changeIndex = newThreadsArr.findIndex(
      (item) => item.number === journalData.number
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

      <AddFlossForm  AddThreads={AddThreads} onChange={onChange} />

      <JournalList
        data={shownFloss}
        onSearchFloss={onSearchFloss}
        changeThreats={changeThreats}
        deleteFloss={deleteFloss}
        saveChanges={saveChanges}
      />
    </div>
  );
};
