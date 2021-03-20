import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }:any) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.jwtToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;