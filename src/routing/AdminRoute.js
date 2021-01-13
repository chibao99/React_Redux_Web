import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, auth: { user }, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
        console.log('user', user?.isAdmin);
       return !user?.isAdmin ? <Redirect to="/" /> : <Component {...props} />
    }}
  />
);
AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(AdminRoute);
