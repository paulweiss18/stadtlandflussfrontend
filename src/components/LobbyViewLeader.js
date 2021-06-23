import React, {Component} from 'react';
import './LobbyViewLeader.css';
import LobbyService from "../services/LobbyService";
import {CustomWebsocket} from "../context/CustomWebsocket";
import GameService from "../services/GameService";



class LobbyViewLeader extends Component{

    websocket: CustomWebsocket;

    constructor(props){
        super(props);

        this.state = {
            lobbyObj: undefined,
            playerId: this.props.history.location.state.playerId,
            excludedLetters: '',
            categories: '',
            numberOfRounds: 0
        };

        this.startGame = this.startGame.bind(this);
        this.saveConfig = this.saveConfig.bind(this);
        this.handleMessageWebsocket = this.handleMessageWebsocket.bind(this);


        this.websocket = new CustomWebsocket(this.props.history.location.state.playerId);
        this.websocket.onReceiveMessage = this.handleMessageWebsocket;

        window.addEventListener('beforeunload', ()=>this.websocket.disconnect());
    }


    componentDidMount() {
        if (window.sessionStorage.getItem('lobbyCode') == null) {
            LobbyService.createLobby(this.props.history.location.state.playerId).then((res) => {
                    this.setState({
                        lobbyObj: res.data,
                        excludedLetters: ((res.data.gameConfiguration.excludedLetters).toString()),
                        numberOfRounds: res.data.gameConfiguration.numberOfRounds,
                        categories: ((res.data.gameConfiguration.categories).toString())
                    });

                    window.sessionStorage.setItem('lobbyCode', res.data.lobbyCode);
                });
        } else {
            LobbyService.getLobby(window.sessionStorage.getItem('lobbyCode')).then((res) => {
                this.setState({
                    lobbyObj: res.data,
                    excludedLetters: ((res.data.gameConfiguration.excludedLetters).toString()),
                    numberOfRounds: res.data.gameConfiguration.numberOfRounds,
                    categories: ((res.data.gameConfiguration.categories).toString())
                })
            });
        }
    }


    handleMessageWebsocket = (e) => {
        let data = JSON.parse(e.data)

        console.log(data.type)

        if(data.type === 'updateLobby'){
            this.setState({
                lobbyObj: data.data
            })

        }else if(data.type === 'startGame'){
            window['socket'] = this.websocket;
            this.props.history.push('/Playground', {
                round: data.data,
                lobbyObj: this.state.lobbyObj
            })
        }
    }



    saveConfig = (e) => {
        LobbyService.saveGameConfiguration(this.state.playerId, this.state.lobbyObj.lobbyCode, this.state.numberOfRounds,this.state.excludedLetters, this.state.categories).then((res) => {
            this.setState({
                lobbyObj: res.data,
                excludedLetters: ((res.data.gameConfiguration.excludedLetters).toString()),
                numberOfRounds: res.data.gameConfiguration.numberOfRounds,
                categories: ((res.data.gameConfiguration.categories).toString())
            })
        });
    }


    startGame = (e) => {
        GameService.startGame(this.state.playerId, this.state.lobbyObj.lobbyCode).then((res)=>{
            console.log(res);
        }).catch(error => {
            alert("Not enough Players");
        });

    }




    handleChangeNumberOfRounds = event => {
        this.setState({numberOfRounds: event.target.value})
    }

    handleChangeCategories = event => {
        this.setState({categories: event.target.value})
    }

    handleChangeExcludedLetters = event => {
        this.setState({excludedLetters: event.target.value})
    }


    render(){



        if(this.state.lobbyObj) {

            const list = (this.state.lobbyObj.players).map((p) => <p key={p.userid}>{p.username}</p>);

            return (
                    <div className="main-lobby">
                        <div className="container-lobby-header">
                            <p id="title1">Stadt - Land - Fluss</p>
                            <p id="title2">Lobby Configuration</p>
                        </div>
                        <p className="header-cat">Lobby Code</p>
                        <div className="container-code">
                            <p>{this.state.lobbyObj.lobbyCode}</p>
                        </div>
                        <div className="config">
                            <p className="header-cat">Excluded Letters</p>
                            <input className="container-cat"   onChange={this.handleChangeExcludedLetters} value={this.state.excludedLetters}/>
                            <p className="header-cat">Categories</p>
                            <input className="container-cat"   onChange={this.handleChangeCategories} value={this.state.categories}/>
                            <p className="header-cat">Number of Rounds</p>
                            <input className="container-cat"   onChange={this.handleChangeNumberOfRounds} value={this.state.numberOfRounds}/>
                            <button className="save-config" onClick={() => {
                                this.saveConfig()
                            }}>Save Configuration</button>
                        </div>
                        <div className="players">
                            <p className="header-cat">Players</p>
                            <div className="container-lobby-players">
                                {list}
                            </div>
                        </div>
                        <div className="container3" onClick={() => {
                            this.startGame()
                        }}>
                            <p className="btnText">Start Game</p>
                        </div>
                    </div>
            );
        }else{
            return(<p>Error</p>);
        }
    }
}



export default LobbyViewLeader;