import Container from "../../components/Container"
import s from "./HomePage.module.scss"
import { Link } from "react-router-dom"

export  const Homepage =({isLoggedIn})=>{

return <Container>
<div><h1>Welcome</h1>

{isLoggedIn? <p>This site is for keeping track of your flosses.


<ul className={s.list}>
      <li><p>On the <Link to="/JournalPage">Journal Page </Link>, you can see the threads you have, to start using this feature, you need to add flosses first.
Our database already has a collection of DMC flosses, therefore, you only need to enter the number of the floss and the quantity (count) that you have.
If your threads are of another manufacture (label), then you can enter them yourself by choosing the color that suits your thread, writing down its number, manufacture (label), color name and quantity.</p></li>
      <li>
        <p>When you add a new thread, it immediately appears in your list, where you can edit its quantity, or remove it when you use it or buy more.</p>
      </li>
      <li><p>When your collection is filled with threads, you can filter them by manufacturer (label) for easy search.
You can also use the search box to find a specific thread from your collection by its number or color name.</p></li>
      <li><p>The site is under construction, so there will be new features in the future.</p></li>
    </ul>





Enjoi using!</p>:<><p>
On this site you can keep track of your threads using a user-friendly interface.</p>
<p>
Нou need to <Link to="/RegisterPage/SignUp">Sign Up</Link> or <Link to="/RegisterPage/LogIn">Log In</Link> to get started with the main features,
</p>
<p>
Without registration, you can look at the DMS color table and find the color you need at <Link to="/ColorsPage"> this page</Link>.
</p> </> }

</div></Container>
}