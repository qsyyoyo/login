import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './pages/login/index';
import Index from './pages/home/index';
import NoMatch from "./pages/404";

class Routes extends Component{
  render(){
    return(
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Index}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/index" component={Index}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Router>
      </div>

    )
  }
}
export default Routes;
