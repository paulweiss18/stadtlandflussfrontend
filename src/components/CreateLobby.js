import React, {Component} from 'react';
import './CreateLobby.css';
import {
    BrowserRouter as Router
} from "react-router-dom";
import LobbyService from "../services/LobbyService";

class CreateLobby extends Component{

    constructor(props){
        super(props);
        this.state = { username: '' };
        this.createLobbyFunction = this.createLobbyFunction.bind(this);
    }

    handleChange = event => {
        this.setState({ username: event.target.value });
    };

    createLobbyFunction = (e) => {
        const LobbyObj = LobbyService.createLobby(this.state.username).then((res) => {
            this.props.history.push(LobbyObj);
        });
        this.props.history.push("/Lobby");
    }
    render(){

        return(
            <Router>
                <div className="main">
                    <form>
                        <div className="container">
                            <p id="title1">Stadt - Land - Fluss</p>
                            <p id="title2">Online</p>
                        </div>

                        <input className="input" type="text" placeholder="Enter your Name" value={this.state.username} onChange={this.handleChange}/>

                        <div className="container2" onClick={() => {this.createLobbyFunction()}}>
                            <p className="btnText">Create new Lobby</p>
                        </div>
                    </form>
                </div>
            </Router>
        );
    }

}

export default CreateLobby;