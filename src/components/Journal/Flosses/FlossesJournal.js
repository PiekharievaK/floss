import { JournalList } from "./JournalList/JournalList";
import AddFlossForm from "./AddFlossForm/addFlossForm";
import { useState, useEffect } from "react";
import operations from "../../..//helpers/journalOperations";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Block } from "notiflix";
import { searchFilter } from "../../../helpers/searchFilter";
import { Confirm } from "notiflix";

export const FlossesJournal = ({ user }) => {
  const [userCollection, setUserCollection] = useState([]);
  const [newThreadsArr, setNewThreadsArr] = useState([]);
  const [newThread, setNewThread] = useState({});
  const [shownFloss, setShownFloss] = useState(userCollection);

  const { getAllFlosses, updateFloss, addNewFloss, deleteFloss } = operations;
  const navigate = useNavigate();

  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    getAllFlosses(user, setUserCollection);
    if (window.location.pathname === "/JournalPage") {
      navigate("/JournalPage/Floss");
    }
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

  const AddThreads = async (e, label) => {
    e.preventDefault();
    try {
      console.log(label);
      Block.standard(`.${e.target.classList[0]}`, { svgSize: "20px" });
      if (label === "Other") {
        await addNewFloss(user, { ...newThread, customLabel: true });
        await getAllFlosses(user, setUserCollection);
        // Block.remove(`.${e.target.classList[0]}`)
      } else {
        await addNewFloss(user, { ...newThread, label });
        await getAllFlosses(user, setUserCollection);
      }
      Block.remove(`.${e.target.classList[0]}`);
    } catch (error) {
      Block.remove(`.${e.target.classList[0]}`);
      console.log(error);
    }
  };

  const onSearchFloss = (e) => {
    searchFilter(e.target.value, userCollection, setShownFloss);
  };

  const deleteOneFloss = async (flossId, flossLabel, flossNumber) => {
    Confirm.show(
      "Delete",
      `Are you shure that you want to delete this floss: "${flossLabel} №${flossNumber}"?`,
      "Yes",
      "No",
      async () => {
        await deleteFloss(user.collectionId, flossId);
        await getAllFlosses(user, setUserCollection);
        return;
      },
      () => {
        return;
      },
      {
        titleColor: "#80bdff",
        okButtonBackground: "#80bdff",
      }
    );
  };

  const updateOneFloss = async (flossId, count) => {
    await updateFloss(user.collectionId, flossId, count);
    await getAllFlosses(user, setUserCollection);
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
    <>
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
    </>
  );
};
