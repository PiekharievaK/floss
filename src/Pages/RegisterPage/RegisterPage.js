import {Registration} from "../../components/Registration/Registration"
import { LoginForm } from "../../components/Login/Login"


export  const RegisterPage =({signUpUser, logInUser, setUser})=>{
    return <div><h1>RegisterPage</h1>
{<Registration signUpUser={signUpUser}/>}
{<LoginForm logInUser={logInUser} setUser={setUser}/>}

    {/* <form> */}
    {/* <input type={"text"} placeholder="email"></input>
      <input type={"text"} placeholder="login"></input>  
      <input type={"text"} placeholder="password"></input> 
      <button style={{width: "fitContent", height: "20px"}}>submit</button> */}
    {/* </form> */}

    {/* <form>
    <h2>Log In</h2>
      <input type={"text"} placeholder="login"></input>  
      <input type={"text"} placeholder="password"></input> 
      <button style={{width: "fitContent", height: "20px"}}>submit</button>
    </form> */}
    </div>
    }