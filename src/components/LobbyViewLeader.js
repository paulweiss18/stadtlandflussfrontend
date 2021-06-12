import React, {Component} from 'react';
import './LobbyViewLeader.css';
import LobbyService from "../services/LobbyService";




class LobbyViewLeader extends Component{

    constructor(props){
        super(props);

        this.state = {
            lobbyObj: undefined,
            playerId: ''
        };


        this.startGame = this.startGame.bind(this);
    }



    componentDidMount() {

        if (window.sessionStorage.getItem('playerId') == null || window.sessionStorage.getItem('lobbyCode') == null) {
            LobbyService.createPlayer(this.props.history.location.state.username).then((res) => {
                this.setState({
                    playerId: res.data.userid
                })
                window.sessionStorage.setItem('playerId', res.data.userid);
                LobbyService.createLobby(res.data.userid).then((res) => {
                    this.setState({
                        lobbyObj: res.data
                    })
                    window.sessionStorage.setItem('lobbyCode', res.data.lobbyCode);
                });
            });


        } else {
            this.setState({playerId: window.sessionStorage.getItem('playerId')});
            LobbyService.getLobby(window.sessionStorage.getItem('lobbyCode')).then((res) => {
                this.setState({
                    lobbyObj: res.data
                })
            });
        }


    }


    startGame = (e) => {
        console.log("started");
        this.props.history.push('/');
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
                        <input className="container-cat" placeholder={this.state.lobbyObj.gameConfiguration.excludedLetters}/>
                        <p className="header-cat">Categories</p>
                        <input className="container-cat" placeholder={this.state.lobbyObj.gameConfiguration.categories}/>
                        <p className="header-cat">Number of Rounds</p>
                        <input className="container-cat" placeholder={this.state.lobbyObj.gameConfiguration.numberOfRounds}/>
                        <button className="save-config">Save Configuration</button>
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