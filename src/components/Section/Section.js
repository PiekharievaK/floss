import React from 'react';
import PropTypes from 'prop-types';
import style from './Section.module.scss';

export default function Section({ children, className, ...attrs }) {
  const classes = `${style.section} ${className}`;
  return (
    <section {...attrs} className={classes}>
      {children}
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};
