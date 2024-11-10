import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
