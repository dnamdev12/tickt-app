import routes from './routesData'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from './privateRoute';

const Routes = () => {
  return (
    <Router basename="/home">
        <Switch>
          {routes.map((route: any) => {
            if(route.redirectTO) {
              return <Redirect to={route.redirectTO}/>
            }
            if(route.privateRoute) {
              return <PrivateRoute path={route.path} component={route.component} />
            }
            if(route.authRoute) {
              return <PrivateRoute path={route.path} component={route.component} authRoute />
            }
            return <Route path={route.path} component={route.component} exact={route.exact}/>
          }
          )}
          {/* <Redirect from='*' to='/' /> */}
        </Switch>
    </Router>
  );
}

export default Routes;
