import { useState } from 'react';
// import axios from "axios"
// import { toast } from 'react-toastify';
// import operations from 'redux/auth/authOperation';
// import { useDispatch } from 'react-redux';
import s from './Login.module.css'

export const LoginForm = ({logInUser, setUser})=> {
  // const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

// const logInUser = async(userData)=>{
//   try {
//       const { data } = await axios.post('/users/login', userData);
//       // const {data} = await axios.get("/DMCflossCollection")
//       // token.set(data.token);
//       return data;
//     } catch (error) {
//       return (
//         toast.error(
//           'Something wrong. Please  check that the form is filled out correctly and try again. Or  go to sign up.'
//         )
//       );
//     }
//   }

  const handleSubmit = e => {
    e.preventDefault();
console.log("submit");
console.log(logInUser);
 logInUser({email, password}, setUser )
    // dispatch(operations.logInUser({ email: email, password: password }));
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  return (
    <>
     
      <form onSubmit={handleSubmit} className={s.form} >
        <input
          name="email"
          value={email}
          type="text"
          className={s.input}
          placeholder="email"
          onChange={handleChange}
        />
        <input
          name="password"
          value={password}
          type="password"
          className={s.input}
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit" className={s.button}>Submit</button>
      </form>
    </>
  );
};
