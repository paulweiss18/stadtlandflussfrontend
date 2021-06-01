import React, {Component} from 'react';
import './Lobby.css'
import {
    BrowserRouter as Router
} from "react-router-dom";

class Lobby extends Component{
    constructor(props){
        super(props);
        this.state = {
            LobbyObj: props.LobbyObj
        }
        this.startGame = this.startGame.bind(this);
    }

    startGame = (e) => {
        console.log("started");
        this.props.history.push('/');
    }

    render(){
        return(
            <Router>
                <div className="main">
                    <div className="container">
                        <p id="title1">Stadt - Land - Fluss</p>
                        <p id="title2">Lobby</p>
                    </div>
                    <div className="container">
                        <p>Player1</p>
                    </div>
                    <div className="container2" onClick={() => {this.startGame()}}>
                        <p className="btnText">Start Game</p>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Lobby;