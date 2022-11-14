import s from "../Header/Header.module.scss"
import { Link } from "react-router-dom"

export const Header =()=>{
    return<div>
         <ul>
            <li className={s.li}><Link to="/">Homepage</Link> </li>
            <li className={s.li}><Link to="/ColorsPage">ColorsPage</Link> </li>
            <li className={s.li}><Link to="/UserPage">UserPage</Link> </li>
            <li className={s.li}><Link to="/JournalPage">Joural</Link> </li>
            <li className={s.li}><Link to="/RegisterPage">Register</Link> </li>
        </ul>
    </div>
}