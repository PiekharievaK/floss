import { useSelector } from "react-redux";
import Container from "../Container";
import logo from "../../images/icon2v2.png";
import sprite from "../../images/sprite.svg";
import s from "./Footer.module.scss";

export const Footer = () => {
const isDark = useSelector((state) => state.theme.isDark);
  let animation;
  const onClick = (e) => {
    const heart = document.getElementById("heart");
    if (heart.classList.contains("visually-hidden")) {
      heart.classList.remove("visually-hidden");
      heart.classList.add(s.locationSvg);
      animation = setTimeout(() => {
        heart.classList.remove(s.locationSvg);
        heart.classList.add("visually-hidden");
      }, 4000);
      return;
    } else {
      clearTimeout(animation);
      heart.classList.remove(s.locationSvg);
      heart.classList.add("visually-hidden");
    }
  };

  return (
    <footer className={s.box}>
      <Container>
        <div className={s.content}>
          <div className={s.info}>
            <div className={s.footerSection}>
              <a href="/">
                <img src={logo} alt="Site logo" className={s.logo} />
              </a>
            </div>
            <div className={s.footerSection}>
              <h3 className={s.title}>Contact us</h3>
              <ul className={s.socList}>
                <li className={isDark? s.socLinkDark :s.socLink}>
                  {" "}
                  <a href="https://github.com/PiekharievaK" target="blank">
                    {" "}
                    <span className="visually-hidden">GitHub</span>{" "}
                    <svg className={s.svg}>
                      <use href={`${sprite}#icon-github`}></use>
                    </svg>{" "}
                  </a>
                </li>
                <li className={isDark? s.socLinkDark :s.socLink}>
                  {" "}
                  <a
                    href="https://www.linkedin.com/in/kateryna-piekharieva/"
                    target="blank"
                  >
                    <span className="visually-hidden">Linkedin</span>{" "}
                    <svg className={s.svg}>
                      <use href={`${sprite}#icon-linkedin-with-circle`}></use>
                    </svg>{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div className={s.footerSection}>
              <address>
                <ul className={s.contactsList}>
                  <li className={s.contactsItem}>
                    {" "}
                    <a
                      href="mailto:pechareva@gmail.com"
                      className={isDark? s.contactsLinkDark :s.contactsLink}
                    >
                      <span className="visually-hidden">Email</span>{" "}
                      <svg className={s.contactsSvg}>
                        <use href={`${sprite}#icon-mail`}></use>
                      </svg>{" "}
                      <span>pechareva@gmail.com</span>
                    </a>
                  </li>
                  <li className={s.contactsItem}>
                    {" "}
                    <a
                      href="tel:+380956650827"
                      className={isDark? s.contactsLinkDark :s.contactsLink}
                    >
                      <span className="visually-hidden">Phone</span>{" "}
                      <svg className={s.contactsSvg}>
                        <use href={`${sprite}#icon-mobile`}></use>
                      </svg>
                      <span>+380956650827</span>
                    </a>{" "}
                  </li>
                  <li className={s.contactsItem} onClick={onClick}>
                    <button className={isDark? s.contactsLinkDark :s.contactsLink}>
                      <span className="visually-hidden">Location</span>{" "}
                      <svg className={s.contactsSvg}>
                        <use href={`${sprite}#icon-map2`}></use>
                      </svg>
                      <span> Ukraine, Kharkiv</span>{" "}
                      <svg className="visually-hidden" id="heart">
                        <use href={`${sprite}#icon-heart`}></use>
                      </svg>
                    </button>{" "}
                  </li>
                </ul>
              </address>
            </div>
          </div>
        </div>
        <div className={isDark?s.underlineDark:s.underline}></div>
        <div className={s.copyright}>Ukraine 2022 </div>
      </Container>
    </footer>
  );
};
