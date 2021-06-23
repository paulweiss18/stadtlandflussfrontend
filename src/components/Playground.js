
import {CustomWebsocket} from "../context/CustomWebsocket";
import React, {Component}  from 'react';


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
        return (
            <div>
                <p>Playground</p>
                <p>Rounds: {this.state.currentRound}/{this.state.lobbyObj.gameConfiguration.numberOfRounds}</p>
                <p>Letter: {this.state.currentLetter}</p>
            </div>
        );

    }

}

export default Playground;