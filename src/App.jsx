import React from 'react';
import InvalidPage from "./containers/invalidPage/InvalidPage";
import Header from "./components/Header/Header";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import PublicPage from "./containers/publicPage/PublicPage";
import Footer from "./components/Footer/Footer";
import RegisterPage from "./containers/registerPage/RegisterPage";
import StartupRegistration from "./containers/startupRegistration/StartupRegistration";
import StartupSetup from "./containers/startupSetup/StartupSetup";
import SetupCompleted from "./containers/startupSetup/SetupCompleted";

function App() {

  return (
      <Router>
          <Header/>

          <Switch>
              <Route exact path="/">
                  <PublicPage />
              </Route>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
              <Route exact path="/register/startup">
                  <StartupRegistration />
              </Route>
              <Route exact path="/startup/setup">
                  <StartupSetup />
              </Route>
              <Route exact path="/startup/setup/completed">
                  <SetupCompleted />
              </Route>
              <Route path="*">
                  <InvalidPage />
              </Route>
          </Switch>

          <Footer />
      </Router>
  );
}

export default App;
