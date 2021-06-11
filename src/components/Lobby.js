import React, {Component} from 'react';
import './Lobby.css';
import {
    BrowserRouter as Router
} from "react-router-dom";
import LobbyService from "../services/LobbyService";




class Lobby extends Component{

    constructor(props){
        super(props);

        this.state = {
            lobbyObj: '',
            lobbyCode: this.props.location.state.lobbyCode,
            username: this.props.location.state.username,
            playerId: ''
        };

    }

    componentDidMount() {

        if(window.sessionStorage.getItem('playerId') == null || window.sessionStorage.getItem('lobbyCode') == null){
            LobbyService.createPlayer(this.props.history.location.state.username).then( (res) => {
                this.setState({
                    playerId: res.data.userid
                })
                window.sessionStorage.setItem('playerId', res.data.userid);
                LobbyService.joinLobby(res.data.userid, this.props.history.location.state.lobbyCode).then( (res) => {
                    this.setState({
                        lobbyObj: res.data
                    })
                    window.sessionStorage.setItem('lobbyCode', res.data.lobbyCode);
                });
            });

        }else{
            this.setState({playerId: window.sessionStorage.getItem('playerId')})

            LobbyService.getLobby(window.sessionStorage.getItem('lobbyCode'))
                .then((res) => {
                this.setState({
                    lobbyObj: res.data}
                )});
        }
    }


    render() {

        if (this.state.lobbyObj) {

            const list = (this.state.lobbyObj.players).map((p) => <p key={p.userid}>{p.username}</p>);


            return (
                <div className="main-lobby">
                    <div className="container-lobby-header">
                        <p id="title1">Stadt - Land - Fluss</p>
                        <p id="title2">Lobby</p>
                    </div>
                    <p className="header-cat">Lobby Code</p>
                    <div className="container-code">
                        <p>{this.state.lobbyObj.lobbyCode}</p>
                    </div>
                    <div className="config">
                        <p className="header-cat">Excluded Letters</p>
                        <div className="container-cat">
                            <p>{this.state.lobbyObj.gameConfiguration.excludedLetters}</p>
                        </div>
                        <p className="header-cat">Categories</p>
                        <div className="container-cat">
                            <p>{this.state.lobbyObj.gameConfiguration.categories}</p>
                        </div>
                        <p className="header-cat">Number of Rounds</p>
                        <div className="container-cat">
                            <p>{this.state.lobbyObj.gameConfiguration.numberOfRounds}</p>
                        </div>
                    </div>
                    <div className="players">
                        <p className="header-cat">Players</p>
                        <div className="container-lobby-players">
                            {list}
                        </div>
                    </div>
                    <div className="container4">
                        <p className="btnText">Waiting for Lobby Leader ...</p>
                    </div>
                </div>
            );
        }else{
            return (<p>Error</p>)
        }
    }
}


export default Lobby;