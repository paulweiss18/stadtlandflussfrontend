import React, {Component} from 'react';
import './VotingScreenLeader.css'
import GameService from "../services/GameService";
import LobbyService from "../services/LobbyService";

class VotingScreenLeader extends Component{

    pointMap = new Map();
    pointMapCurrentRound = new Map();
    websocket: CustomWebsocket;

    constructor(props) {
        super(props);

        this.props.history.location.state.lobbyObj.players.map((p) => {
            this.pointMap.set(p.userid, parseInt(p.score));
            var points = [];
            this.pointMapCurrentRound.set(p.userid, points)
            this.props.history.location.state.lobbyObj.gameConfiguration.categories.map((c, index) => {
                this.pointMapCurrentRound.get(p.userid)[index] = 0;
            })
        });

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
            console.log(data.data)
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

    handleChangePoints(e, playerid, index){
        this.pointMapCurrentRound.get(playerid)[index] = e.target.value;
    }

    submitPoints(){
        for (const [key, value] of this.pointMapCurrentRound.entries()) {
            let count = 0;
            for(let i in value){
                count = count + parseInt(value[i])

            }

            this.pointMap.set(key, parseInt(this.pointMap.get(key))+count);
        }
        console.log(this.pointMap)

        for (const [key, value] of this.pointMap.entries()) {
            GameService.votePlayer(key, value.toString());
        }
        GameService.nextRound(this.state.lobbyObj.lobbyCode)
    }

    render(){
        let myMap = new Map(Object.entries(this.state.lobbyObj.gamePlay.rounds[this.state.lobbyObj.gamePlay.currentRound].answers));

        const list = (this.state.lobbyObj.gameConfiguration.categories).map((c, index) =>
            <div key={c}>
                <p className="header-cat">{c}</p>
                <div className="container-category">
                    {(this.state.lobbyObj.players).map((p) =>
                            <div id="wrapper">
                                <div id="left2">
                                    <p id="player">{p.username}</p>
                                </div>
                                <div id="middle2">
                                    <p id="answer2">{myMap.get(p.userid)[index]}</p>
                                </div>
                                <div id="right2">
                                    <select id="sel-points" onChange={e => this.handleChangePoints(e, p.userid, index)}><option value="0">0</option><option value="5">5</option><option value="10">10</option></select>
                                </div>
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

                <div className="container6" onClick={() => {
                    this.submitPoints()
                }}>
                    <p className="btnText">Submit Points</p>
                </div>
            </div>
        )
    }

}

export default VotingScreenLeader;