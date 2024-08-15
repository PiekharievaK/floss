import { Outlet, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Homepage } from "./Pages/Homepage/HomePage";
import { UserPage } from "./Pages/UserPage/Userpage";
import { JournalPage } from "./Pages/JournalPage/JournalPage";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import { RegisterPage } from "./Pages/RegisterPage/RegisterPage";
import { ColorsPage } from "./Pages/ColorsPage/ColorsPage";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { LoginForm } from "./components/Login/Login";
import { Registration } from "./components/Registration/Registration";
import { NotFound } from "./Pages/404Page/404";
import { Verification } from "./Pages/Verification/Verification";
import {PasswordPage} from "./Pages/PasswordPage/PasswordPage";
import { PrivateRoute, PublicRoute } from "./components/Routers";
import { ThemeContext } from "./components/ThemeProvider/ThemeProvider";
import { Notify } from "notiflix";

import operations from "./helpers/authOperations";
// import startServer from "./helpers/startServerOperations";
import "./App.css";

function App() {
  const { signUpUser, logInUser, logOut, fetchCurrentUser, resetPassword } = operations;

  const [user, setUser] = useState({ status: "unauthorise" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pending, setPending] = useState(true);

  const [{ theme }] = useContext(ThemeContext);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.data.message === "jwt expired" || error.response.data.message === "Not authorized" )
        {
          setUser({ status: "unauthorise" });
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          Notify.failure("Your session has expired, you logout authomaticly");
          return Promise.reject();
        } else {
          return Promise.reject(error);
        }
      }
    );
  }, []);

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   startServer()
    //   setPending(false)
    //   return;
    // }
    try {
      setPending(true);
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
      <div
        className="App"
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.color,
        }}
      >
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
              }
            >
              {/* <Route path="Floss" element={<Registration signUpUser={signUpUser}/>}/>
            <Route path="Schemas" element={<Registration signUpUser={signUpUser}/>}/> */}
            </Route>
            <Route
              path={"ProfilePage/*"}
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <ProfilePage />
                </PrivateRoute>
              }
            />

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
              }
            >
              <Route
                path="SignUp"
                element={<Registration signUpUser={signUpUser} />}
              />
              <Route
                path="LogIn"
                element={
                  <LoginForm
                    logInUser={logInUser}
                    setUser={setUser}
                    setIsLoggedIn={setIsLoggedIn}
                    resetPassword={resetPassword}
                  />
                }
              />
              <Route />
            </Route>
            <Route path="Verification/*" element={<Verification />} />
            <Route path="PasswordPage/*" element={<PasswordPage />} />
          </Route>

          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="*" element={<Homepage />} />
        </Routes>
        <Footer />
      </div>
    )
  );
}

export default App;
