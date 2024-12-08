import { NavLink, Link } from "react-router-dom"
import Button from "../Button"
import Container from "../Container"
import logo from "../../images/icon1.png"
import ThemeButton from "../ThemeProvider/ThemeButton"
import s from "../Header/Header.module.scss"

export const Header =({user, logOut, setUser, setIsLoggedIn, isLoggedIn})=>{
    const userName= user.login
    

const onLogOut = async(e) =>{
    const nav = document.getElementById("navigation")
    await logOut(setUser, setIsLoggedIn)
    nav.classList.contains(s.active) && toggleModal(e)
}


const toggleModal =(e) =>{
    const button = document.getElementsByClassName(s.burgerButton)[0]
    const nav = document.getElementById("navigation")
   
    if(e.target.alt === "Site logo"&& nav.classList.contains(s.active)){
    button.textContent= "•••"
    nav.classList.remove(s.active)
    document.body.classList.remove("modal__active")
    window.removeEventListener("resize", onResize)
    return
    }
    else if (e.target.alt === "Site logo"){
        return
    }

    document.body.classList.toggle("modal__active")
    nav.classList.toggle(s.active)
    if(nav.classList.contains(s.active)){
        button.textContent = `X`
        window.addEventListener("resize", onResize )
    }
    else{
    window.removeEventListener("resize", onResize)
    button.textContent = `•••`
    }
}

const onResize =(e) => {
    if(e.target.innerWidth > 767){
        const nav = document.getElementById("navigation")
        const button = document.getElementsByClassName(s.burgerButton)[0]
        button.textContent= "•••"
        nav.classList.remove(s.active)
        document.body.classList.remove("modal__active")
        window.removeEventListener("resize", onResize)
    }
   
}

const getLinkClassName = ({ isActive }) =>
isActive ? s.active__link : s.link;


    return<div className={s.box}>
        <Container>
        <div className={isLoggedIn?s.content: s.unauthoresedContent}>
            <div className={s.secction}>
        <NavLink to="/"  onClick={toggleModal}> <img src={logo} alt="Site logo" className={s.logo}></img> </NavLink>
        </div>
         {isLoggedIn ?<>
         <nav className={s.nav} id="navigation">
          <ul className={s.list}>
            <li className={s.item}><NavLink to="/" className={getLinkClassName} onClick={toggleModal}>Home page</NavLink> </li>
            <li className={s.item}><NavLink to="/ColorsPage" className={getLinkClassName} onClick={toggleModal}>Colors Page</NavLink> </li>
            <li className={s.item}><NavLink to="/UserPage" className={getLinkClassName} onClick={toggleModal}>User Page</NavLink> </li>
            <li className={s.item}><NavLink to="/JournalPage" className={getLinkClassName} onClick={toggleModal}>Journal</NavLink> </li>
            </ul><div className={s.buttonBox}>
            <ThemeButton/> 
            </div>
         </nav >    
         <div className={s.userBox}> <NavLink to="/ProfilePage" className={ (e)=> e.isActive? s.active__userName: s.userName }> {userName? userName: user.status}</NavLink> <Button className={s.button} onClick={onLogOut}>logOut</Button></div>
         </>
            : 
           <> <nav className={s.unauthoriseNav} id="navigation">
           <ul className={s.list}>
            <li className={s.item}><NavLink to="/"  className={getLinkClassName} onClick={toggleModal}>Home page</NavLink> </li>
            <li className={s.item}><NavLink to="/ColorsPage"  className={getLinkClassName} onClick={toggleModal}>Colors Page</NavLink> </li>
            <li className={s.item}><NavLink to="/RegisterPage"  className={getLinkClassName} onClick={toggleModal}>Registration</NavLink> </li>
          </ul> 
        </nav >
        <ThemeButton/></>
    }
     {/* <ThemeButton/> */}
    <Button onClick={toggleModal} className={s.burgerButton}>•••</Button>
            </div>
            </Container>
    </div>
}


