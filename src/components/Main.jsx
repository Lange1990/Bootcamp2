import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./Home/Home";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}