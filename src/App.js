import React from 'react';
import './App.css';
import CreateLobby from "./components/CreateLobby";
import JoinLobby from "./components/JoinLobby";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Startpage from "./components/Startpage";
import Lobby from "./components/Lobby";

function App() {
  return (
      <div>
          <Router>
              <div class="container-main">
                  <Switch>
                      <Route path="/" exact component={Startpage}></Route>
                      <Route path="/Startpage" component={Startpage}></Route>
                      <Route path="/CreateLobby" component={CreateLobby}></Route>
                      <Route path="/JoinLobby" component={JoinLobby}></Route>
                      <Route path="/Lobby" component={Lobby}></Route>
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
