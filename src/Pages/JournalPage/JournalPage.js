import { useNavigate, Route, Routes, NavLink } from "react-router-dom";
import { useEffect } from "react";
import {
  FlossesJournal,
  SchemasJournal,
  WishList,
} from "../../components/Journal/";
import Container from "../../components/Container";
import Section from "../../components/Section";
import s from "./JournalPage.module.scss";
import { useSelector } from "react-redux";

export const JournalPage = ({ user }) => {
  const navigate = useNavigate();

  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    if (window.location.pathname === "/JournalPage") {
      navigate("/JournalPage/Floss");
    }
  }, []);

  const getLinkClassName = ({ isActive }) =>
    isActive
      ? isDark
        ? s.active__linkDark
        : s.active__link
      : isDark
      ? s.linkDark
      : s.link;

  return (
    <Container>
      <Section>
        {/* <h1>JOURNAL</h1> */}

        <div className={s.linkBox}>
          <NavLink to="Floss" className={getLinkClassName}>
            Flosses
          </NavLink>

          <NavLink to="Schemas" className={getLinkClassName}>
            Schemas
          </NavLink>
          <NavLink to="WishList" className={getLinkClassName}>
            Wish list
          </NavLink>
        </div>
        <Routes>
          <Route path="Floss" element={<FlossesJournal user={user} />} />
          <Route path="Schemas" element={<SchemasJournal user={user} />} />
          <Route path={"WishList"} element={<WishList user={user} />} />
        </Routes>
      </Section>
    </Container>
  );
};
