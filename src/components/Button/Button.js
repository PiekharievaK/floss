import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import style from './Button.module.scss';

export default function Button({ children, className, ...attrs }) {
  const classes = `${style.button} ${className}`;
  return (
    <button {...attrs} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};
