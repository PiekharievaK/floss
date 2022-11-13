import s from "../Header/Header.module.scss"

export const Header =()=>{
    return<div>
         <ul>
            <li className={s.li}><a href="/">Homepage</a> </li>
            <li className={s.li}><a href="/floss/ColorsPage">ColorsPage</a> </li>
            <li className={s.li}><a href="/floss/UserPage">UserPage</a> </li>
            <li className={s.li}><a href="/floss/JournalPage">Joural</a> </li>
            <li className={s.li}><a href="/floss/RegisterPage">Register</a> </li>
        </ul>
    </div>
}