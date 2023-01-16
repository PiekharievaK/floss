import axios from "axios";
import notiflix, { Loading, Notify } from "notiflix";

// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = 'https://floss-server.onrender.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const signUpUser = async (userData) => {
  Loading.standard(`...Loading`);
  try { 
    const { data } = await axios.post("/users/signup", userData);
    Loading.remove();

    token.set(data.token);
    notiflix.Confirm.show(
      "Email Confirm",
      "Do you agree with it?",
      "Yes",
      "It is Yes too",
      async () => {
        try {
          Loading.standard(`...Loading`);
          await axios.get(`${data.user.linkToVerify}`);
          Loading.remove()
          Notify.success("You have successfully registered on our website");
        } catch (error) {
          Loading.remove();
          Notify.failure(
            `Your email is not verify.  use this link to fix it ${data.user.linkToVerify}`
          );
        }
      },
      async () => {
        try {
          await axios.get(`${data.user.linkToVerify}`);
          Notify.success("You have successfully registered on our website");
        } catch (error) {
          Loading.remove();
          Notify.failure(
            `Your email is not verify.  use this link to fix it ${data.user.linkToVerify}`
          );
        }
      },
      {}
    );

    return data;
  } catch (error) {
    Loading.remove();
    return Notify.failure(`${error.response.data.message}.`);
  }
};

const logInUser = async (userData, setUser, setIsLoggedIn) => {
  Loading.standard(`...Loading`);
  try {
    const { data } = await axios.post("/users/login", userData);
    token.set(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    setIsLoggedIn(true);
    Loading.remove()
    Notify.success("You have successfully logged in");
    return data;
  } catch (error) {
    Loading.remove()
    return Notify.failure(`${error.response.data.message}.`);
  }
};

const logOut = async (setUser, setIsLoggedIn) => {
  try {
    await axios.get("/users/logout");
    token.unset();
    setUser({ status: "unauthorise" });
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    Notify.success("You have successfully logged out");
  } catch (error) {
    Notify.failure("Your token has expired, you logout authomaticly");
    window.location.reload();
    return;
  }
};

const fetchCurrentUser = async (setUser, setIsLoggedIn) => {
  // const state = thunkAPI.getState();
  // const userToken = state.auth.token;
  Loading.standard(`...Loading`);
  const usertoken = localStorage.getItem("token");
  token.set(usertoken);

  if (usertoken === null) {
    // return thunkAPI.rejectWithValue();
  }

  try {
    const { data } = await axios.get("/users/current");
    setUser(data.data.user);
    setIsLoggedIn(true);
    Loading.remove();
    return data;
  } catch (error) {
    Loading.remove();
    // Notify.failure("Please log in or sign up");
    return;
  }
};

const operations = {
  signUpUser,
  logOut,
  logInUser,
  fetchCurrentUser,
};
export default operations;
