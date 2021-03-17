import routes from './routes'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          {routes.map((route) => 
          !route.redirectTO?
            <Route path={route.path} component={route.component} exact={route.exact}/>:
            <Redirect to={route.redirectTO}/>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
