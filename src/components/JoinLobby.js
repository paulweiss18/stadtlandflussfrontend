import React, {Component} from 'react';
import './JoinLobby.css';
import {
    BrowserRouter as Router
} from "react-router-dom";
import LobbyService from "../services/LobbyService";

class JoinLobby extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            lobbycode:''
        };
        this.joinLobbyFunction = this.joinLobbyFunction.bind(this);
    }
    handleChange = event => {
        this.setState({ username: event.target.value});
    };
    handleChange2 = event => {
        this.setState({ lobbycode: event.target.value});
    };
    joinLobbyFunction = (e) => {
        let playerid = LobbyService.createPlayer(this.state.username)
        console.log(playerid);
        console.log(this.state.lobbycode);
        const LobbyObj = LobbyService.joinLobby(playerid, this.state.lobbycode);
        this.props.history.push("/Lobby");
    }

    render(){
        return(
            <Router>
                <div className="main">
                    <div className="container">
                        <p id="title1">Stadt - Land - Fluss</p>
                        <p id="title2">Online</p>
                    </div>

                    <input className="input" type="text" placeholder="Enter your Name" value={this.state.username} onChange={this.handleChange}/>

                    <input className="input" type="text" placeholder="Enter Lobby Code" value={this.state.lobbycode} onChange={this.handleChange2}/>

                    <div className="container2" onClick={() => {this.joinLobbyFunction()}}>
                        <p className="btnText">Join Lobby</p>
                    </div>
                </div>
            </Router>
        );
    }
}

export default JoinLobby;