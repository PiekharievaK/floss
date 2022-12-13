import axios from 'axios';
import { toast } from 'react-toastify';
import notiflix from "notiflix"


// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'https://floss-server.onrender.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signUpUser = async(userData)=>{
  try {
      const { data } = await axios.post('/users/signup', userData);
      token.set(data.token);
notiflix.Confirm.show(
    'Email Confirm',
    'Do you agree with it?',
    'Yes',
    'It is Yes too',
    async() => {
        console.log(data.user.linkToVerify);
        await axios.get(`${data.user.linkToVerify}`);
    },
    async() => {
     await axios.get(data.user.linkToVerify)
    },
    {
    },
    );
    
      return data;
    } catch (error) {
      return (
        toast.error(
          'Something wrong. Please  check that the form is filled out correctly and try again. Or go to sign in.'
        )
      );
    }}

    const logInUser = async(userData, setUser, setIsLoggedIn)=>{
      try {
          const { data } = await axios.post('/users/login', userData);
          token.set(data.token);
          setUser(data.user)
          localStorage.setItem("token", data.token)
          setIsLoggedIn(true)
          return data;
        } catch (error) {
          return (
            toast.error(
              'Something wrong. Please  check that the form is filled out correctly and try again. Or  go to sign up.'
            )
          );
        }
      }


const logOut = async(setUser, setIsLoggedIn)=>{
  try {
      await axios.get('/users/logout');
      token.unset();
      setUser({status:"unauthorise"})
      setIsLoggedIn(false)
      localStorage.removeItem("token")
    } catch (error) {
      return (toast.error('Error logout'));
    }
  }


const fetchCurrentUser =async(setUser, setIsLoggedIn)=>{
  
    // const state = thunkAPI.getState();
    // const userToken = state.auth.token;
   const usertoken = localStorage.getItem("token")
   token.set(usertoken)

    if (usertoken === null) {
      // return thunkAPI.rejectWithValue();
    }

    // token.set(userToken);

    try {
      const { data } = await axios.get('/users/current');
      setUser(data.data.user)
      setIsLoggedIn(true)
      return data;
    } catch (error) {
      return toast.error('Error fetch current user.');
    }
  }

const operations = {
  signUpUser,
  logOut,
  logInUser,
  fetchCurrentUser,
};
export default operations;
