import axios from 'axios';
import { toast } from 'react-toastify';


axios.defaults.baseURL = 'http://localhost:3001';

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
      return data;
    } catch (error) {
      return (
        toast.error(
          'Something wrong. Please  check that the form is filled out correctly and try again. Or go to sign in.'
        )
      );
    }}

    const logInUser = async(userData, setUser)=>{
      try {
          const { data } = await axios.post('/users/login', userData);
          setUser(data.user)
        
          token.set(data.token);
          localStorage.setItem("token", data.token)
          return data;
        } catch (error) {
          return (
            toast.error(
              'Something wrong. Please  check that the form is filled out correctly and try again. Or  go to sign up.'
            )
          );
        }
      }


const logOut = async(setUser)=>{
  try {
      await axios.get('/users/logout');
      token.unset();
      localStorage.removeItem("token")
      setUser({status:"unauthorise"})
    } catch (error) {
      return (toast.error('Error logout'));
    }
  }


const fetchCurrentUser =async(setUser)=>{
  
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
      return data;
    } catch (error) {
      // return thunkAPI.rejectWithValue(toast.error('Error fetch current user.'));
    }
  }

const operations = {
  signUpUser,
  logOut,
  logInUser,
  fetchCurrentUser,
};
export default operations;
