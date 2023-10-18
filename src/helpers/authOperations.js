import axios from "axios";
import notiflix, { Loading, Notify } from "notiflix";

// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://floss-server.onrender.com";

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

    verifyNotification(userData);
    return data;
  } catch (error) {
    Loading.remove();
    if (error.response.data.message === "Email in use") {
      verifyNotification(userData);
    }
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
    Loading.remove();
    // Notify.success("You have successfully logged in");
    return data;
  } catch (error) {
    Loading.remove();
    if (error.response.data.message === `Email is not verify`) {
      verifyNotification(userData);
    }
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
    setUser({ status: "unauthorise" });
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.reload();
    return;
  }
};

const verifyNotification = (userData) => {
  notiflix.Confirm.show(
    "Do you get verification email?",
    `Please check all folders including "spam" `,
    "Yes",
    "No (send it again)",
    () => {
      try {
        Notify.success("Please verify your email using instructions in letter");
      } catch (error) {
        Loading.remove();
        Notify.failure(`Your email is not verify`);
      }
    },
    async () => {
      try {
        await resendVerify(userData);
        Notify.success(
          "Verification letter is send again. if You still don`t get it, please contact us"
        );
      } catch (error) {
        Loading.remove();
        Notify.failure(`Your email is not verify`);
      }
    },
    {}
  );
};

const fetchCurrentUser = async (setUser, setIsLoggedIn) => {
  // const state = thunkAPI.getState();
  // const userToken = state.auth.token;
  Loading.standard(`...Loading`);
  const usertoken = localStorage.getItem("token");
  token.set(usertoken);
  // if (usertoken === null) {
  //   // return thunkAPI.rejectWithValue();
  // }

  try {
    const { data } = await axios.get("/users/current");
    setUser(data.data.user);
    setIsLoggedIn(true);
    localStorage.setItem("token", data.data.token);
    token.set(data.data.token);
    Loading.remove();
    return data;
  } catch (error) {
    Loading.remove();
    // Notify.failure("Please log in or sign up");
    return;
  }
};

const resendVerify = async (user) => {
  try {
    const { data } = await axios.post("/users/verify", user);
  } catch (error) {
    Notify.failure(error.message);
    return;
  }
};

const emailVerify = async (VerificationToken) => {
  try {
    Loading.standard(`...Loading`);
    const { data } = await axios.get(`/users/verify/${VerificationToken}`);
    Notify.success(
      "Congratulations. You has succesfully complete registration"
    );
    Loading.remove();
    return true;
  } catch (error) {
    Loading.remove();
    Notify.failure(error.response.data.message);
    return false;
  }
};

const operations = {
  signUpUser,
  logOut,
  logInUser,
  fetchCurrentUser,
  emailVerify,
};
export default operations;
