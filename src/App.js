import { Header } from './components/Header/Header';
import {Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { Homepage } from './Pages/Homepage/HomePage';
import { UserPage } from './Pages/UserPage/Userpage';
import { JournalPage } from './Pages/JournalPage/JournalPage';
import { RegisterPage } from './Pages/RegisterPage/RegisterPage';
import {ColorsPage} from "./Pages/ColorsPage/ColorsPage"
// import { PrivateRoute, PublicRoute } from './components/Routers';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path="/" element={<Outlet />}>
              <Route index  element={<Homepage />}/>
                <Route
                  path="/ColorsPage"
                  element={
                    // <PublicRoute>
                    <ColorsPage />
                    /* </PublicRoute> */
                  }
                  />
                 <Route
                  path="/Registerpage"
                  element={
                    // <PublicRoute>
                    <RegisterPage />
                    /* </PublicRoute> */
                  }
                />
                <Route
                  path={'/UserPage'}
                  element={
                    // <PrivateRoute>
                    <UserPage />
                    // </PrivateRoute>
                  }
                  />
                <Route
                  path={'/JournalPage'}
                  element={
                    // <PrivateRoute>
                      <JournalPage
                        />
                    // </PrivateRoute>
                  }
                  />
                 <Route
                  path="*"
                  element={
                    <Homepage />
                  }
                  />
                 </Route>
            </Routes>
    </div>
  );
}

export default App;
