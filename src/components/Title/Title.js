import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Title.module.scss';

export default function Title({ children, className, ...attrs }) {
  const classes = classNames(style.title, style[className]);

  return (
    <h2 {...attrs} className={classes}>
      {children}
    </h2>
  );
}

Title.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};
