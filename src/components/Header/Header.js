import s from "../Header/Header.module.scss"

export const Header =()=>{
    return<div>
         <ul>
            <li className={s.li}><a href="/">Homepage</a> </li>
            <li className={s.li}><a href="/ColorsPage">ColorsPage</a> </li>
            <li className={s.li}><a href="/UserPage">UserPage</a> </li>
            <li className={s.li}><a href="/JournalPage">Joural</a> </li>
            <li className={s.li}><a href="/RegisterPage">Register</a> </li>
        </ul>
    </div>
}