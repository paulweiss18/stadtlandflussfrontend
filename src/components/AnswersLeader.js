import React, {Component}  from 'react';
import './AnswersLeader.css';

class AnswersLeader extends Component{

    render() {
        return (
            <div className="main-game">
                <div className="container-answer-header">
                    <p id="title1">Stadt - Land - Fluss</p>
                    <p id="title2">Answers</p>
                </div>

                <div className="container-category">
                    <p id="category">//Category</p>
                    <p id="player">//Playername</p><p id="answer">//Answer</p><p><select id="sel-points"><option value="5">5</option><option value="10">10</option></select></p>
                </div>

                <div className="container3" onClick={() => {
                    //this.SubmitPoints()
                }}>
                    <p className="btnText">Submit Points</p>
                </div>
            </div>
        );
    }
}

export default AnswersLeader;