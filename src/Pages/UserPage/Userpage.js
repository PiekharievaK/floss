import {Route, Routes, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../../components/Container"
import s from "../UserPage/UserPage.module.scss"

export  const UserPage =()=>{

    const isDark = useSelector((state) => state.theme.isDark);
    const linkClass = isDark? s.linkDark :s.link
    // const navigate = useNavigate()
    return <Container><h1>UserPage</h1>

    <Routes>
<Route path="" element={<ul className={s.list}>
        <li className={s.item}> <Link to="/ProfilePage" className={linkClass}>Profile </Link></li>
        <li className={s.item}><Link to="/JournalPage" className={linkClass}>My floss </Link></li>
        <li className={s.item}><Link to="/JournalPage/Schemas" className={linkClass}>My schemas </Link> <span>(beta version)</span></li>
        <li className={s.item}> <Link to="/JournalPage/WishList" className={linkClass}>My wish list</Link></li>
        <li className={s.item}><a  className={linkClass} href="https://flosscross.com/" target="blank">Create schema by image online </a> (website)</li>
        <li className={s.item}><a  className={linkClass} href="https://moresxem.com/category/sxemi-pdf/" target="blank">Find schemas </a> (website)</li>
        {/* Можно добавить онлайн чат через вебсокет  */}
        {/* <li className={s.item}> <Link to="/Chat" className={linkClass}>Site group chat</Link></li> */}
        {/* Можно сделать общую страницу с вопросами по типу форума */}
        {/* <li className={s.item}> <Link to="/Forum" className={linkClass}>Site forum</Link></li> */}
        </ul>}>
        </Route>

        {/* <Route path="Profile" element={<div className={s.box}> <button className={s.botton}><Link to="/UserPage" className={s.link + " " + s.back}>{"< Back"} </Link></button><h2 className={s.title}>Not available yet</h2></div>}        /> */}
   
    </Routes>
    

        </Container>
    }