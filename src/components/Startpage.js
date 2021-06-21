import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import JoinLobby from "./JoinLobby";
import {useHistory} from "react-router-dom";

function Startpage() {
    let history = useHistory();

    return (
            <Router>
                <div className="App">
                    <div className="main">
                        <div className="container">
                            <p id="title1">Stadt - Land - Fluss</p>
                            <p id="title2">Online</p>
                        </div>
                        <div className="container2" onClick={() => {history.push("/CreateLobby")}}>
                            <p className="btnText">Create new Lobby</p>
                        </div>
                        <div className="container2" onClick={() => {history.push("/JoinLobby")}}>
                            <Route exact path="/JoinLobby" component={JoinLobby}/>
                            <p className="btnText">Join via Code</p>
                        </div>
                    </div>
                </div>
            </Router>
    );
}

export default Startpage;