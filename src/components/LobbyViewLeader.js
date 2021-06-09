import React, {Component} from 'react';
import './Lobby.css'
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
                <div className="main">
                    <div className="container">
                        <p id="title1">Stadt - Land - Fluss</p>
                        <p id="title2">Lobby Configuration</p>
                    </div>
                    <div className="container">
                        <p>{this.state.lobbyObj.lobbyCode}</p>
                    </div>

                    <div className="container">
                        {list}
                    </div>

                    <div className="container2" onClick={() => {
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