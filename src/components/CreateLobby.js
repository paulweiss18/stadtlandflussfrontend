import React, {Component, useEffect, useState} from 'react';
import './CreateLobby.css';
import LobbyService from "../services/LobbyService";
import {CustomWebsocket} from "../context/CustomWebsocket";


class CreateLobby extends React.Component{

    websocket: CustomWebsocket

    state = {
        username: ''
    };

    constructor(props){
        super(props);
        this.createLobbyFunction = this.createLobbyFunction.bind(this);
    }

    createLobbyFunction = (e) => {
        window.sessionStorage.removeItem('lobbyCode');

        LobbyService.createPlayer(this.state.username).then((res) => {
            window.sessionStorage.setItem('playerId', res.data.userid);

            window.sessionStorage.setItem('websocket',this.websocket);
            this.props.history.push("/LobbyViewLeader", {username: this.state.username,
                                                         playerId: res.data.userid});
        });
    }


    handleChange = event => {
        this.setState({ username: event.target.value });
    };

    render() {



        return (
                <div className="main">
                    <form>
                        <div className="container">
                            <p id="title1">Stadt - Land - Fluss</p>
                            <p id="title2">Online</p>
                        </div>
                        <input className="input" type="text" placeholder="Enter your Name" value={this.state.username}
                               onChange={this.handleChange}/>
                        <div className="container2" onClick={() => {
                            this.createLobbyFunction()
                        }}>
                            <p className="btnText">Create new Lobby</p>
                        </div>
                    </form>
                </div>
        );
    }
}


export default CreateLobby;