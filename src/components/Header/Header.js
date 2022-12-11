import s from "../Header/Header.module.scss"
import { Link } from "react-router-dom"

export const Header =({user, logOut, setUser, setIsLoggedIn, isLoggedIn})=>{
    const userName= user.login
const onClick = () =>{
    logOut(setUser, setIsLoggedIn)
}

    return<div>
         {isLoggedIn ?
         <ul>
            <li className={s.li}><Link to="/">Homepage</Link> </li>
            <li className={s.li}><Link to="/ColorsPage">ColorsPage</Link> </li>
            <li className={s.li}><Link to="/UserPage">UserPage</Link> </li>
            <li className={s.li}><Link to="/JournalPage">Journal</Link> </li>
            </ul>: 
            <ul>
            <li className={s.li}><Link to="/">Homepage</Link> </li>
            <li className={s.li}><Link to="/ColorsPage">ColorsPage</Link> </li>
            <li className={s.li}><Link to="/RegisterPage">Register</Link> </li>
        </ul>}
<div>user: <span>{userName? userName: user.status}</span> <button onClick={onClick}>logOut</button></div>
    </div>
}