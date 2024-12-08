import { useState } from "react";
import operations from "../../helpers/userProfileOperations";
import { Notify } from "notiflix";

export const ChangePasswordModal = () => {
  const { checkPassword } = operations;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState('')
  const [checkingPassword, setCheckingPassword] = useState('')
  const [passwordOk, setPasswordOk] = useState(false);

  const verifyPassword = async (e) => {
    e.preventDefault();
    const password = e.target.oldPassword.value;
    const data = await checkPassword(password);
    console.log(data);
    setPasswordOk(data);
    if (data === true) {
      Notify.success(
        "Your current password is correct. Please enter new password to change it"
      );
      e.target.reset()
    }
  };

const changePasword = (e) =>{
  e.preventDefault()
}

const handleChange = ()=>{}


  return (
    <div className="Box">
      {!passwordOk ? (
        <div className="Old input">
          <form onSubmit={verifyPassword}>
            {" "}
            <div>
              {" "}
              <label>enter old password</label>
              <input name="oldPassword"></input>
            </div>
            <button> Confirm </button>
          </form>
        </div>
      ) : (
        <div className="new Input">
          <form onSubmit={(e)=>{e.preventDefault()}}>
            {" "}
            <div>
              {" "}
              <label>enter new password</label>
              <input 
              // type="password" 
              name="newPassword"  ></input>
            </div>{" "}
            <div>
              {" "}
              <label>repeat new password</label>
              <input
              //  type="password" 
               name="repeatPassword"  ></input>
            </div>{" "}
            <button> Confirm </button>{" "}
          </form>
        </div>
      )}
    </div>
  );
}; 
