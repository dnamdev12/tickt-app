import routes from './routesData';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from './privateRoute';
import Header from '../common/header/index';
import ScrollToTop from '../common/scrollToTop';

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Switch>
        {routes.map((route: any) => {
          if (route.redirectTO) {
            return <Redirect to={route.redirectTO} />
          }
          if (route.privateRoute) {
            // return <PrivateRoute path={route.path} component={route.component} />
            return <PrivateRoute {...route} />
          }
          if (route.authRoute) {
            // return <PrivateRoute path={route.path} Component={route.component} authRoute />
            return <PrivateRoute {...route} />
          }
          return <Route path={route.path} component={route.component} exact={route.exact} />
        }
        )}
        {/* <Redirect from='*' to='/' /> */}
      </Switch>
    </Router>
  );
}

export default Routes;
