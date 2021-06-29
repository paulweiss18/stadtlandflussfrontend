import React, {Component} from 'react';
import './Lobby.css';
import {
    BrowserRouter as Router
} from "react-router-dom";
import LobbyService from "../services/LobbyService";
import {CustomWebsocket} from "../context/CustomWebsocket";


class Lobby extends Component{

    websocket: CustomWebsocket;

    constructor(props){
        super(props);

        this.state = {
            lobbyObj: '',
            lobbyCode: this.props.location.state.lobbyCode,
            username: this.props.location.state.username,
            playerId: ''
        };

        this.handleMessageWebsocket = this.handleMessageWebsocket.bind(this);

        this.websocket = new CustomWebsocket(this.props.history.location.state.playerId);
        this.websocket.onReceiveMessage = this.handleMessageWebsocket.bind(this);

        window.addEventListener('beforeunload', ()=>this.websocket.disconnect());
    }


    componentDidMount() {
        if(window.sessionStorage.getItem('lobbyCode') == null){
            LobbyService.joinLobby(this.props.history.location.state.playerId, this.props.history.location.state.lobbyCode).then( (res) => {
                    this.setState({
                        lobbyObj: res.data
                    })
                    window.sessionStorage.setItem('lobbyCode', res.data.lobbyCode);
            });

        }else{
            LobbyService.getLobby(window.sessionStorage.getItem('lobbyCode'))
                .then((res) => {
                this.setState({
                    lobbyObj: res.data}
                )});
        }
    }

    handleMessageWebsocket = (e) => {

        let data = JSON.parse(e.data)

        if(data.type === 'updateLobby'){
            this.setState({
                lobbyObj: data.data
            })
        }else if(data.type === 'startGame'){
            window['websocket'] = this.websocket;

            this.props.history.push('/Playground', {
                round: data.data,
                lobbyObj: this.state.lobbyObj
            })
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
                            <p>{this.state.lobbyObj.gameConfiguration.excludedLetters.toString()}</p>
                        </div>
                        <p className="header-cat">Categories</p>
                        <div className="container-cat">
                            <p>{this.state.lobbyObj.gameConfiguration.categories.toString()}</p>
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
            return (<p></p>)
        }
    }
}


export default Lobby;