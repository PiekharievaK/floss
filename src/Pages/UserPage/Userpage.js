import s from "../UserPage/UserPage.module.scss"

export  const UserPage =()=>{
    return <div><h1>UserPage</h1>
    <ul className={s.ul}>
        <li className={s.li}>Profile</li>
        <li className={s.li}>My threads</li>
        <li className={s.li}>My schemas</li>
        <li className={s.li}><a href="https://doitms.com/csm/" target="blank">Create schema by image online </a></li>
        <li className={s.li}><a href="https://moresxem.com/category/sxemi-pdf/" target="blank">Find schemas </a></li> 
        <li className={s.li}>My wish list</li>
        </ul></div>
    }