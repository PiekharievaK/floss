import { Header } from "./components/Header/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./Pages/Homepage/HomePage";
import { UserPage } from "./Pages/UserPage/Userpage";
import { JournalPage } from "./Pages/JournalPage/JournalPage";
import { RegisterPage } from "./Pages/RegisterPage/RegisterPage";
import { ColorsPage } from "./Pages/ColorsPage/ColorsPage";
import { useEffect, useState } from "react";
// import { PrivateRoute, PublicRoute } from './components/Routers';
import operations from "./helpers/authOperations";

function App() {
const [user, setUser] = useState({user:{email:""}, token:"",  status: "unauthorize"})

const { signUpUser, logInUser, logOut, fetchCurrentUser} = operations
// axios.defaults.baseURL = 'http://localhost:3001';

useEffect(()=>{
  fetchCurrentUser(setUser)
}, [])

useEffect(()=>{
  console.log(user);
}, [user])

  return (
    <div className="App">
      <Header user={user} logOut={logOut} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Homepage />} />
          <Route
            path="ColorsPage"
            element={
              // <PublicRoute>
              <ColorsPage />
              /* </PublicRoute> */
            }
          />
          <Route
            path="Registerpage"
            element={
              // <PublicRoute>
              <RegisterPage signUpUser={signUpUser} logInUser={logInUser} setUser={setUser}/>
              /* </PublicRoute> */
            }
          />
          <Route
            path={"UserPage"}
            element={
              // <PrivateRoute>
              <UserPage />
              // </PrivateRoute>
            }
          />
          <Route
            path={"JournalPage"}
            element={
              // <PrivateRoute>
              <JournalPage />
              // </PrivateRoute>
            }
          />
          <Route path="*" element={<Homepage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
