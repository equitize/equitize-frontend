import React, { useState, useEffect } from 'react';
import InvalidPage from "./containers/invalidPage/InvalidPage";
import Header from "./components/Header/Header";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import Homepage from './components/Homepage';
import Dropdown from './components/Dropdown';


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
          <Dropdown isOpen={isOpen} toggle={toggle}/>
          <Homepage />

          <Switch>
              <Route exact path="/">
                  <p>Home Page TODO</p>
              </Route>
              <Route path="*">
                  <InvalidPage />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
