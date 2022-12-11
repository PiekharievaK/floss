import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import authSelectors from '../../redux/auth/auth-selectors';
import PropTypes from 'prop-types';

function PublicRoute({isLoggedIn, children}) {

  return isLoggedIn === true ? <Navigate to="/UserPage" replace={true} /> : children ;
}
PublicRoute.propTypes = {
  children: PropTypes.element,
};
export default PublicRoute;
