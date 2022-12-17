// import s from "../JournalPage/JournalPage.module.scss";
import journalData from "./journalData";
import { useEffect, useState } from "react";
import { JournalList } from "../../components/JournalList/JournalList";
import operations from "../../helpers/journalOperations";
import AddFlossForm from "../../components/AddFlossForm/addFlossForm";
import { searchFilter } from "../../helpers/searchFilter";
import Container from "../../components/Container";

export const JournalPage = (user) => {
  const [userCollection, setUserCollection] = useState([]);
  const [newThreadsArr, setNewThreadsArr] = useState([]);
  const [newThread, setNewThread] = useState({});
  const [shownFloss, setShownFloss] = useState(userCollection);

  const { getAll, updateFloss, addNewFloss, deleteFloss } = operations;

  useEffect(() => {
    getAll(user, setUserCollection);
  }, []);

  useEffect(() => {
    setShownFloss(userCollection);
  }, [userCollection]);

  const onChange = (e) => {
    setNewThread({ ...newThread, [e.target.name]: e.target.value });
  };

  const clearThreed = () => {
    setNewThread({});
  };

  const AddThreads = async (e) => {
    e.preventDefault();

    await addNewFloss(user, newThread);
    await getAll(user, setUserCollection);
  };

  const onSearchFloss = (e) => {
    searchFilter(e.target.value, userCollection, setShownFloss);
  };

  const deleteOneFloss = async (flossId) => {
    await deleteFloss(user.user.collectionId, flossId);
    await getAll(user, setUserCollection);
    return;
  };

  const updateOneFloss = async (flossId, count) => {
    await updateFloss(user.user.collectionId, flossId, count);
    await await getAll(user, setUserCollection);
  };

  const saveChanges = () => {
    window.alert(JSON.stringify(newThreadsArr));
  };
  const changeThreats = (journalData) => {
    const changeIndex = newThreadsArr.findIndex(
      (item) => item.number === journalData.number
    );

    if (changeIndex >= 0) {
      const newArray = [...newThreadsArr];
      newArray[changeIndex] = journalData;
      setNewThreadsArr(newArray);
    } else setNewThreadsArr([...newThreadsArr, journalData]);
  };

  return (
    <Container>
      <h1>JOURNAL</h1>

      <AddFlossForm
        AddThreads={AddThreads}
        onChange={onChange}
        clearThreed={clearThreed}
      />

      <JournalList
        data={shownFloss}
        onSearchFloss={onSearchFloss}
        changeThreats={changeThreats}
        deleteOneFloss={deleteOneFloss}
        saveChanges={saveChanges}
        updateOneFloss={updateOneFloss}
      />
    </Container>
  );
};
