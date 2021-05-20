import React from 'react';
import InvalidPage from "./containers/invalidPage/InvalidPage";
import Header from "./components/Header/Header";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import Homepage from './components/Homepage';


function App() {
  return (
      <Router>
          <Header />
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
