import React, {Component} from 'react';
import './VotingScreenPlayer.css'
import GameService from "../services/GameService";

class VotingScreenPlayer extends Component{

    websocket: CustomWebsocket;

    constructor(props) {
        super(props);

        this.state = {
            lobbyObj: this.props.history.location.state.lobbyObj,
        }

        this.websocket = window['websocket'];

        this.handleMessageWebsocket = this.handleMessageWebsocket.bind(this);
        this.websocket.onReceiveMessage = this.handleMessageWebsocket;

    }

    handleMessageWebsocket = (e) => {
        let data = JSON.parse(e.data)

        if(data.type === "nextRound"){
            window['websocket'] = this.websocket;

            this.props.history.push('/Playground', {
                round: data.data.gamePlay,
                lobbyObj: data.data
            })
        }else if(data.type === "finished"){
            this.props.history.push('/FinalPage',{
            lobbyObj: data.data
            })
        }
    }



    render(){

        let myMap = new Map(Object.entries(this.state.lobbyObj.gamePlay.rounds[this.state.lobbyObj.gamePlay.currentRound].answers));

        const list = (this.state.lobbyObj.gameConfiguration.categories).map((c, index) =>
            <div key={c}>
                <p>{c}</p>
                <div className="container-category">
                    {(this.state.lobbyObj.players).map((p) =>
                        <div>
                            <p id="player">{p.username}</p>
                            <p id="answer">{myMap.get(p.userid)[index]}</p>
                        </div>
                    )}
                </div>
            </div>);

        return(
            <div className="main-game">
                <div className="container-answer-header">
                    <p id="title1">Stadt - Land - Fluss</p>
                    <p id="title2">Voting Answers</p>
                </div>

                {list}

                <div className="container3">
                    <p className="btnText">Waiting for Lobby Leader to Submit ... </p>
                </div>
            </div>
        )
    }

}

export default VotingScreenPlayer;