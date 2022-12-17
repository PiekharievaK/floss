import { Link } from "react-router-dom"
import Container from "../../components/Container"
import s from "../UserPage/UserPage.module.scss"

export  const UserPage =()=>{
    return <Container><h1>UserPage</h1>
    <ul className={s.list}>
        <li className={s.item}>Profile <span>(developing)</span></li>
        <li className={s.item}><Link to="./JoutnalPage" className={s.link}>My floss </Link></li>
        <li className={s.item}>My schemas <span>(developing)</span></li>
        <li className={s.item}><a  className={s.link} href="https://doitms.com/csm/" target="blank">Create schema by image online </a></li>
        <li className={s.item}><a  className={s.link} href="https://moresxem.com/category/sxemi-pdf/" target="blank">Find schemas </a></li> 
        <li className={s.item}>My wish list <span>(developing)</span></li>
        </ul></Container>
    }