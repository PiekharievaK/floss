import { React, useEffect } from 'react';
import s from "./Modal.module.scss";
import sprite from "../../images/sprite.svg";




export const Modal =({ children, onClose }) =>{
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
  
    const handleBackdropClick = event => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };
  
    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
  
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

 return (<div className={s.backdrope} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button className={s.modal__close_button} onClick={onClose}>
          <svg className={s.modal__cross_icon} > <use href={`${sprite}#icon-cross`} alt="cross"></use></svg>
        </button>

        {children}
      </div>
    </div>)



}
   
