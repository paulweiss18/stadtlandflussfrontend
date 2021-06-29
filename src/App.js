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
import LobbyViewLeader from "./components/LobbyViewLeader";
import Playground from "./components/Playground";
import VotingScreenLeader from "./components/VotingScreenLeader";
import VotingScreenPlayer from "./components/VotingScreenPlayer";
import FinalPage from "./components/FinalPage";

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
                      <Route path="/LobbyViewLeader" component={LobbyViewLeader}></Route>
                      <Route path="/Playground" component={Playground}>
                      </Route><Route path="/VotingScreenLeader" component={VotingScreenLeader}></Route>
                      <Route path="/VotingScreenPlayer" component={VotingScreenPlayer}></Route>
                      <Route path="/FinalPage" component={FinalPage}></Route>
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
