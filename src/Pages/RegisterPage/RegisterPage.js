import {Registration} from "../../components/Registration/Registration"
import { LoginForm } from "../../components/Login/Login"
import { useState } from "react"


export  const RegisterPage =({signUpUser, logInUser, setUser, setIsLoggedIn})=>{
const [regisrtation, setRegistration] = useState()

const handleChange =(e)=>{
    setRegistration(e.target.id)
}

    return <div><h1>RegisterPage</h1>
    <div>
<button id={"login"} onClick={handleChange}>Login</button>
<button id={"signup"} onClick={handleChange}>Signup</button>        
    </div>
{regisrtation=== "signup" &&<Registration signUpUser={signUpUser}/>}
{ regisrtation=== "login" &&<LoginForm logInUser={logInUser} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}
    </div>
    }