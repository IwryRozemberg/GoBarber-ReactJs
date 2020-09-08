import React from 'react';
import {
  RouteProps as RouterDomProps,
  Route as RouterDomRoute,
  Redirect,
} from 'react-router-dom';
import { useAuthContext } from '../hooks/AuthContext';

interface RouteProps extends RouterDomProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  component: Component,
  isPrivate = false,
  ...rest
}) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <RouterDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === isAuthenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isAuthenticated ? '/dashboard' : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
