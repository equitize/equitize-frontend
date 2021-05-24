import React, { useState, useEffect } from 'react';
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
import HeaderDropdown from './components/HeaderDropdown/HeaderDropdown';

function App() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const hideMenu = () => {
            if(window.innerWidth > 768 && isOpen) {
                setIsOpen(false)
            }
        }

        window.addEventListener('resize', hideMenu)

        return () => {
            window.removeEventListener('resize', hideMenu)
        }
    })

  return (
      <Router>
          <Header toggle={toggle}/>
          <HeaderDropdown isOpen={isOpen} toggle={toggle}/>

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
              <Route path="*">
                  <InvalidPage />
              </Route>
          </Switch>

          <Footer />
      </Router>
  );
}

export default App;
