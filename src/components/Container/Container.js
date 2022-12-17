import PropTypes from 'prop-types';

import style from './Container.module.scss';

function Container({ children }) {
  return (
    <div className={style.container}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
