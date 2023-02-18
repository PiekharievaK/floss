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
        <li className={s.item}> <Link to="/UserPage/Profile" className={linkClass}>Profile </Link><span>(developing)</span></li>
        <li className={s.item}><Link to="/JournalPage" className={linkClass}>My floss </Link></li>
        <li className={s.item}><Link to="/JournalPage/Schemas" className={linkClass}>My schemas </Link> <span>(beta version)</span></li>
        <li className={s.item}> <Link to="/JournalPage/WishList" className={linkClass}>My wish list </Link><span>(beta version)</span></li>
        <li className={s.item}><a  className={linkClass} href="https://doitms.com/csm/" target="blank">Create schema by image online </a> (website)</li>
        <li className={s.item}><a  className={linkClass} href="https://moresxem.com/category/sxemi-pdf/" target="blank">Find schemas </a> (website)</li> 
        </ul>}>
        </Route>

        <Route path="WishList" element={<div className={s.box}> <button className={s.botton}><Link to="/UserPage" className={s.link + " " + s.back}>{"< Back"} </Link></button><h2 className={s.title}>Not available yet</h2></div>}/>
        <Route path="Profile" element={<div className={s.box}> <button className={s.botton}><Link to="/UserPage" className={s.link + " " + s.back}>{"< Back"} </Link></button><h2 className={s.title}>Not available yet</h2></div>}/>
    </Routes>
    

        </Container>
    }