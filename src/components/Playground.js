
import {CustomWebsocket} from "../context/CustomWebsocket";
import React, {Component}  from 'react';
import './Playground.css';

class Playground extends Component{

    websocket: CustomWebsocket;

    constructor(props) {
        super(props);

        this.websocket = window['websocket'];

        this.state = {
            gamePlayObj: this.props.history.location.state.round,
            currentRound: (this.props.history.location.state.round.currentRound+1),
            currentLetter: this.props.history.location.state.round.currentLetter,
            lobbyObj: this.props.history.location.state.lobbyObj
        };

    }


    render() {
        const list = (this.state.lobbyObj.players).map((p) => <p key={p.userid}>{p.username}</p>);

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
                    <p className="category">placeholder-Category1</p>
                    <input className="cat-input" placeholder={this.state.currentLetter + "..."}/>
                    <p className="category">placeholder-Category2</p>
                    <input className="cat-input" placeholder={this.state.currentLetter + "..."}/>
                    <p className="category">placeholder-Category3</p>
                    <input className="cat-input" placeholder={this.state.currentLetter + "..."}/>
                </div>
                <div className="players">
                    <p className="header-cat">Players</p>
                    <div className="container-game-players">
                        {list}
                    </div>
                </div>
                <div className="container3" onClick={() => {
                    //this.finishRound()
                }}>
                    <p className="btnText">Finish</p>
                </div>
            </div>
        );

    }

}

export default Playground;