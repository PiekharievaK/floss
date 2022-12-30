import { redirect, Route, Routes, Link, Outlet } from "react-router-dom";
import Container from "../../components/Container"
import s from "../UserPage/UserPage.module.scss"

export  const UserPage =()=>{
    // const navigate = useNavigate()
    return <Container><h1>UserPage</h1>

    <Routes>
<Route path="" element={<ul className={s.list}>
        <li className={s.item}> <Link to="/UserPage/Profile" className={s.link}>Profile </Link><span>(developing)</span></li>
        <li className={s.item}><Link to="/JournalPage" className={s.link}>My floss </Link></li>
        <li className={s.item}><Link to="/JournalPage/Schemas" className={s.link}>My schemas </Link> <span>(developing)</span></li>
        <li className={s.item}><a  className={s.link} href="https://doitms.com/csm/" target="blank">Create schema by image online </a></li>
        <li className={s.item}><a  className={s.link} href="https://moresxem.com/category/sxemi-pdf/" target="blank">Find schemas </a></li> 
        <li className={s.item}> <Link to="/UserPage/WishList" className={s.link}>My wish list </Link><span>(developing)</span></li>
        </ul>}>
        </Route>

        <Route path="WishList" element={<div className={s.box}> <button className={s.botton}><Link to="/UserPage" className={s.link + " " + s.back}>{"< Back"} </Link></button><h2 className={s.title}>Is anviable now</h2></div>}/>
        <Route path="Profile" element={<div className={s.box}> <button className={s.botton}><Link to="/UserPage" className={s.link + " " + s.back}>{"< Back"} </Link></button><h2 className={s.title}>Is anviable now</h2></div>}/>
    </Routes>
    

        </Container>
    }