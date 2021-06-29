
import {CustomWebsocket} from "../context/CustomWebsocket";
import React, {Component}  from 'react';
import './Playground.css';
import GameService from "../services/GameService";

class Playground extends Component{

    websocket: CustomWebsocket;

    constructor(props) {
        super(props);

        this.websocket = window['websocket'];

        this.state = {
            gamePlayObj: this.props.history.location.state.round,
            currentRound: (this.props.history.location.state.round.currentRound+1),
            currentLetter: this.props.history.location.state.round.currentLetter,
            lobbyObj: this.props.history.location.state.lobbyObj,
            answers: []
        };

        this.handleMessageWebsocket = this.handleMessageWebsocket.bind(this);

        try {
            this.websocket.onReceiveMessage = this.handleMessageWebsocket;
            window.addEventListener('beforeunload', () => this.websocket.disconnect());
        }catch (Exception){
            this.websocket = CustomWebsocket(window.sessionStorage.getItem("playerId"));
            this.websocket.onReceiveMessage = this.handleMessageWebsocket;
            window.addEventListener('beforeunload', () => this.websocket.disconnect());
        }
    }

    handleChange(e, index){
        this.state.answers[index] = e.target.value;
        this.setState({
            answers: this.state.answers
        })
    }

    finishRound(){
        GameService.finishRound(window.sessionStorage.getItem('playerId'), this.state.lobbyObj.lobbyCode, this.state.answers);
    }


    handleMessageWebsocket = (e) => {
        let data = JSON.parse(e.data);

        if(data.type === 'finishRound'){
            GameService.finishRound(window.sessionStorage.getItem('playerId'), this.state.lobbyObj.lobbyCode, this.state.answers);
        }else if(data.type === 'lastFinished'){
            window['websocket'] = this.websocket;
            if(data.data.lobbyLeaderPlayer.userid === window.sessionStorage.getItem('playerId')){

                this.props.history.push('/VotingScreenLeader', {
                    lobbyObj: data.data
                })
            }else{
                this.props.history.push('/VotingScreenPlayer', {
                    lobbyObj: data.data
                })
            }
        }

    }


    render() {
        const list = (this.state.lobbyObj.players.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0))).map((p) => <p key={p.userid}>{p.username}: {p.score}</p>);

        return (
            <div className="main-game">
                <div className="container-game-header">
                    <p id="title1">Stadt - Land - Fluss</p>
                    <p id="title2">Game</p>
                </div>
                <div className="container-letter">
                    <p id="letter">Letter: {this.state.currentLetter}</p><p id="numberofrounds">Round: {this.state.currentRound}/{this.state.lobbyObj.gameConfiguration.numberOfRounds}</p>
                </div>

                <div className="game">
                    {
                        this.state.lobbyObj.gameConfiguration.categories.map((e, index) => {
                            return (
                                <div key={index}>
                                    <p className="category">{e}</p>
                                    <input className="cat-input" onChange={(e)=>this.handleChange(e, index)} placeholder={this.state.currentLetter + "..."}/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="players">
                    <p className="header-cat">Players</p>
                    <div className="container-game-players">
                        {list}
                    </div>
                </div>
                <div className="container3" onClick={() => {
                    this.finishRound()
                }}>
                    <p className="btnText">Finish</p>
                </div>
            </div>
        );
    }

}

export default Playground;