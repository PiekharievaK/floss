import s from "../Header/Header.module.scss"
import { Link } from "react-router-dom"

export const Header =({user, logOut, setUser, setIsLoggedIn, isLoggedIn})=>{
    const userName= user.login
const onClick = () =>{
    logOut(setUser, setIsLoggedIn)
}

    return<div>
         {isLoggedIn ?
         <div className={s.box}>
          <ul className={s.list}>
            <li className={s.item}><Link to="/" className={s.link}>Homepage</Link> </li>
            <li className={s.item}><Link to="/ColorsPage" className={s.link}>ColorsPage</Link> </li>
            <li className={s.item}><Link to="/UserPage" className={s.link}>UserPage</Link> </li>
            <li className={s.item}><Link to="/JournalPage" className={s.link}>Journal</Link> </li>
            </ul>
            <div className={s.userBox}><span className={s.user}>user:</span> <span className={s.userName}>{userName? userName: user.status}</span> <button className={s.button} onClick={onClick}>logOut</button></div>
         </div >
            : 
        <div className={s.box}>
           <ul className={s.list}>
            <li className={s.item}><Link to="/">Homepage</Link> </li>
            <li className={s.item}><Link to="/ColorsPage">ColorsPage</Link> </li>
            <li className={s.item}><Link to="/RegisterPage">Register</Link> </li>
          </ul> 
        </div >}

    </div>
}