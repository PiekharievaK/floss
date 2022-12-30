import { Outlet, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Homepage } from "./Pages/Homepage/HomePage";
import { UserPage } from "./Pages/UserPage/Userpage";
import { JournalPage } from "./Pages/JournalPage/JournalPage";
import { RegisterPage } from "./Pages/RegisterPage/RegisterPage";
import { ColorsPage } from "./Pages/ColorsPage/ColorsPage";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { LoginForm } from "./components/Login/Login";
import { Registration } from "./components/Registration/Registration";
import { PrivateRoute, PublicRoute } from "./components/Routers";

import operations from "./helpers/authOperations";
import "./App.css";

function App() {
  const { signUpUser, logInUser, logOut, fetchCurrentUser } = operations;

  const [user, setUser] = useState({ status: "unauthorise" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(true);
    try {
      fetchCurrentUser(setUser, setIsLoggedIn);
      setTimeout(() => {
        setPending(false);
      }, 150);
    } catch {
      setTimeout(() => {
        setPending(false);
      }, 150);
    }
  }, []);

  return (
    !pending && (
      <div className="App">
        <Header
          user={user}
          logOut={logOut}
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Homepage isLoggedIn={isLoggedIn} />} />
            <Route
              path="ColorsPage"
              element={
                // <PublicRoute isLoggedIn={isLoggedIn}>
                <ColorsPage />
                // </PublicRoute>
              }
            />
            <Route
              path={"UserPage/*"}
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <UserPage />
                </PrivateRoute>
              }
            />
            <Route
              path={"JournalPage/*"}
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <JournalPage user={user} />
                </PrivateRoute>
              }>
            {/* <Route path="Floss" element={<Registration signUpUser={signUpUser}/>}/>
            <Route path="Schemas" element={<Registration signUpUser={signUpUser}/>}/> */}

              </Route>

            <Route
              path="Registerpage/"
              element={
                <PublicRoute isLoggedIn={isLoggedIn}>

                  <RegisterPage
                    signUpUser={signUpUser}
                    logInUser={logInUser}
                    setUser={setUser}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                 
                </PublicRoute>
              }>
              <Route path="SignUp" element={<Registration signUpUser={signUpUser}/>}/>
              <Route path="LogIn" element={<LoginForm
                  logInUser={logInUser}
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                 />}/>
            <Route/>

            <Route path="*" element={<Homepage />} >
            </Route>
            </Route>
          </Route>
        </Routes>
        <Footer />
      </div>
    )
  );
}

export default App;
