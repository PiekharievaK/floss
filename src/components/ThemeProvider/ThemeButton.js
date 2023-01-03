import {React,useState,useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from '../../redux/theme/themeSlice';
import BsSun from "../../images/icon.png"
import BsMoon from "../../images/radio2.png"

// import { BsSun, BsMoon } from 'react-icons/bs';

import s from './ThemeButton.module.scss'

export default function ThemeButton(){


    const dispatch = useDispatch();
    const isDark = useSelector((state) => state.theme.isDark);
    const [icon, setIcon] = useState(<button className={s.themeButton}> <span className={s.active}>light</span>|<span>dark</span></button >);

    useEffect(() => {
        if (isDark) {
          setIcon(<button className={s.themeButton}> <span >light</span>|<span className={s.active}>dark</span></button >);
        } else {
          setIcon(<button className={s.themeButton}> <span className={s.active}>light</span>|<span>dark</span></button >);
        }
      }, [isDark]);

    return(
        <div
        className={
          isDark
            ? s.button_theme_swither_dark
            : s.button_theme_swither_light
        }
        onClick={() => dispatch(toggleTheme())}
      >
        {icon}
      </div>
    )
}