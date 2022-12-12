import axios from "axios";
import { toast } from "react-toastify";
import notiflix from "notiflix";

const getAll = async (user, setUserCollection) => {
  const collectionId =  user.user.collectionId ;
  try {
    console.log(collectionId);
    const { data } = await axios.get(`/journal/${collectionId}`);
    setUserCollection(data.flossCollection);
    return data;
  } catch (error) {
    return toast.error(
      "Something wrong. Please  check that the form is filled out correctly and try again. Or go to sign in."
    );
  }
};

const addNewFloss = async (user, userFloss) => {
  // console.log(user);
  const collectionId = user.user.collectionId;
  try {
    if (!userFloss.label) {
      const DMCfloss = { floss: { ...userFloss, label: "DMC" }, collectionId };
      const { data } = await axios.post("/journal", DMCfloss);
      return data;
    }
    const otherFloss = { floss: userFloss, collectionId };
    const { data } = await axios.post("/journal", otherFloss);
    return data;
  } catch (error) {
    return toast.error("Error add floss.");
  }
};
const deleteFloss = async (userData, setUser, setIsLoggedIn) => {
  try {
    const { data } = await axios.post("/users/login", userData);
    setUser(data.user);

    return data;
  } catch (error) {
    return toast.error(
      "Something wrong. Please  check that the form is filled out correctly and try again. Or  go to sign up."
    );
  }
};

const getFlossById = async (setUser, setIsLoggedIn) => {
  try {
    await axios.get("/users/logout");
    setUser({ status: "unauthorise" });
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  } catch (error) {
    return toast.error("Error logout");
  }
};

const operations = {
  getAll,
  getFlossById,
  addNewFloss,
  deleteFloss,
};
export default operations;
