import axios from "axios";
import { Notify } from "notiflix";
import { errorCatcher } from "./errorCatcher";

const getUserData = async (setUserData) => {
  try {
    const { data } = await axios.get(`/profile`);
    setUserData(data);
    return data;
  } catch (error) {
    errorCatcher(error);
  }
};

const checkPassword = async (password) => {
  try {
    const { data } = await axios.put(`/profile/check`, { password: password });
    console.log(data); // setUserData(data);
    return data;
  } catch (error) {
    errorCatcher(error);
  }
};

const changePassword = async (password) => {
  try {

    const { data } = await axios.post(`/profile/changePassword`, { password: password });
    console.log(data); // setUserData(data);
    return data;
  } catch (error) {
    errorCatcher(error);
  }
};

const operations = {
  getUserData,
  checkPassword,
  changePassword,
};
export default operations;
