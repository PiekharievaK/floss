import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import { Modal } from "../../components/Modal/Modal";
import { Confirm } from "notiflix";
import operations from "../../helpers/userProfileOperations";
import s from "./ProfilePage.module.scss";
import { useEffect, useState } from "react";
import { ChangePasswordModal } from "../../components/PasswordOptions/ChangePasswordModal";

export const ProfilePage = () => {
  const { getUserData, checkPassword, changePassword } = operations;
  const [userData, setUserData] = useState({});
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    getUserData(setUserData);
  }, []);
  useEffect(() => {
    //  console.log(isModal);;
  }, [isModal]);

  // console.log(userData);

  const GetTempPassword = (e) => {
    try {
      // Создать свою модалку для смены пароля
      Confirm.prompt(
        "Hello",
        "Enter you current password or temprarry password from email",
        "",
        "Confirm",
        "Cancel",
        async (clientAnswer) => {
          try {
            await checkPassword(clientAnswer);
            changePassword();
          } catch (e) {
            console.log(e.message);
            throw new Error();
          }
        },
        (clientAnswer) => {
          return;
        },
        {}
      );
    } catch (e) {}
  };

  const timeSinceRegistration = (date) => {
    let currentDate = Date.parse(new Date());
    let days = (currentDate - Date.parse(date)) / 86400000; //86400000 - ms в дне
    return Math.round(days);
  };

  return (
    <Container>
      <h2>My Profile</h2>
      <Section>
        <div className={s.dataBox}>
          <div className={s.user}>
            <div className={s.userProfile}>
              <div className={s.profilePic}>
                <img
                  src={userData.avatar}
                  alt="profile avatar"
                  className={s.profilePicImg}
                />
                <div className={s.profilePicButtonBox}>
                  {/* <button className={s.profilePicButton}>
                    Change profile image
                  </button> */}
                  {/* <button>pick profile image</button>
      <button>add profile image</button> */}
                </div>
              </div>
              <h3 className={s.userName}>User Name: {userData.login}</h3>
            </div>
            <div className={s.userInfo}>
              <p className={s.userMail}>User email: {userData.email}</p>
              <p className={s.userTime}>
                Registration date :{" "}
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
              <p className={s.userTime}>
                Time since registration:{" "}
                {timeSinceRegistration(userData.createdAt)} days
              </p>
            </div>
          </div>
          <div className={s.journal}>
            <div className={s.journalBox}>
              <h4>My total</h4>
              <ul className={s.journalList}>
                <li>my flosses: {userData.flosses}</li>
                <li>my schemas: {userData.schemas}</li>
                <li>wishlist: {userData.wishList}</li>
              </ul>
            </div>

            {/* <div className={s.changeButtonBox}>
              <button className={s.changeButton} onClick={ ()=> setIsModal(true)}>change password</button>
              <button className={s.changeButton}>change user name</button>
              <button className={s.changeButton} onClick={GetTempPassword}>get temporary password</button>
            </div> */}
          </div>
        </div>
        {isModal === true && (
          <Modal
            onClose={() => setIsModal(false)}
            children={<ChangePasswordModal />}
          ></Modal>
        )}
      </Section>
    </Container>
  );
};
