import React, { useState } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Auditpage } from "../Audit";
import { history } from "../_helpers";
import { alertActions, userActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { useEffect } from "react";

function App(props) {
  const { alert, user } = props;

  const redirectAuditor = props && props.user && props.user.role === 'user' ? true : false;

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      props.clearAlerts();
    });
  }, []);

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2">
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={redirectAuditor ? HomePage : Auditpage} />
              <Route path="/Home" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/Audit" component={Auditpage} />
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

function mapState(state) {
  const { authentication } = state;
  const { user } = authentication;
  const { alert } = state;
  return { alert, user };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
