import React, {Component}  from 'react';
import './Answers.css';

class Answers extends Component{
    render() {

        return (
            <div className="main-game">
                <div className="container-answer-header">
                    <p id="title1">Stadt - Land - Fluss</p>
                    <p id="title2">Answers</p>
                </div>

                <div className="container-category">
                    <p id="category">//Category</p>
                    <p id="player">//Playername</p><p id="answer">//Answer</p><p id="points">//Points</p>
                </div>

                <div className="container4">
                    <p className="btnText">Waiting for Lobby Leader ...</p>
                </div>
            </div>
        );

    }
}

export default Answers;