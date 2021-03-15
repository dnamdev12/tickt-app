import routes from './routes'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <p>Tickt Web</p>
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
