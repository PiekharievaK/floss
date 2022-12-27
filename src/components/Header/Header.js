import { NavLink } from "react-router-dom"
import Button from "../Button"
import s from "../Header/Header.module.scss"

export const Header =({user, logOut, setUser, setIsLoggedIn, isLoggedIn})=>{
    const userName= user.login
const onClick = () =>{
    logOut(setUser, setIsLoggedIn)
}

const currentUrl = document.location

console.log(currentUrl);
console.log("currentUrl");

const getLinkClassName = ({ isActive }) =>
isActive ? s.active__link : s.link;


    return<div>
         {isLoggedIn ?
         <div className={s.box}>
          <ul className={s.list}>
            <li className={s.item}><NavLink to="/" className={getLinkClassName}>Homepage</NavLink> </li>
            <li className={s.item}><NavLink to="/ColorsPage" className={getLinkClassName}>ColorsPage</NavLink> </li>
            <li className={s.item}><NavLink to="/UserPage" className={getLinkClassName}>UserPage</NavLink> </li>
            <li className={s.item}><NavLink to="/JournalPage" className={getLinkClassName}>Journal</NavLink> </li>
            </ul>
            <div className={s.userBox}> <span className={s.userName}>{userName? userName: user.status}</span> <Button className={s.button} onClick={onClick}>logOut</Button></div>
         </div >
            : 
        <div className={s.box}>
           <ul className={s.list}>
            <li className={s.item}><NavLink to="/"  className={getLinkClassName}>Homepage</NavLink> </li>
            <li className={s.item}><NavLink to="/ColorsPage"  className={getLinkClassName}>ColorsPage</NavLink> </li>
            <li className={s.item}><NavLink to="/RegisterPage"  className={getLinkClassName}>Register</NavLink> </li>
          </ul> 
        </div >}

    </div>
}