import { Route, Redirect } from "react-router-dom";
import storageService from "../utils/storageService";

const PrivateRoute = ({ component: Component, authRoute, ...rest }:any) => {
  const token = storageService.getItem('jwtToken');
  const routeScreen = authRoute ? !token : token;
  return (
    <Route
      {...rest}
      render={props =>
        routeScreen ? (
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