import axios from "axios";
import { toast } from "react-toastify";
import notiflix from "notiflix";

const getAll = async (user, setUserCollection) => {
  const userData = { user: { _id: user.user._id } };
  try {
    console.log(user);
    const { data } = await axios.post("/journal", userData);
    setUserCollection(data.collection);
    return data;
  } catch (error) {
    return toast.error(
      "Something wrong. Please  check that the form is filled out correctly and try again. Or go to sign in."
    );
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

const addNewFloss = async (setUser, setIsLoggedIn) => {
  try {
    const { data } = await axios.get("/users/current");
    setUser(data.data.user);
    setIsLoggedIn(true);
    return data;
  } catch (error) {
    return toast.error("Error fetch current user.");
  }
};

const operations = {
  getAll,
  getFlossById,
  addNewFloss,
  deleteFloss,
};
export default operations;
