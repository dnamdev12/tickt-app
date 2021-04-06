import { Route, Redirect } from "react-router-dom";
import storageService from "../utils/storageService";

const PrivateRoute = ({ component: Component, authRoute, props, ...rest }: any) => {
  const token = storageService.getItem('jwtToken');
  const routeScreen = authRoute ? !token : token;
  console.log(routeScreen, "routeScreen", authRoute, "authRoute", props, "rest", rest)
  return (
    <Route
      {...rest}
      render={props =>
        routeScreen ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signup",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;