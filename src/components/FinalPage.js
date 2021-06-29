import React, {Component} from 'react';
import './FinalPage.css';

class FinalPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            lobbyObj: this.props.history.location.state.lobbyObj
        }
    }

    render() {
        let i = 1;
        const list = (this.state.lobbyObj.players.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0))).map((p) => <p key={p.userid}>{i++}. {p.username}: {p.score}</p>);
        return (
            <div className="main">
                <div className="container">
                    <p id="title1">Stadt - Land - Fluss</p>
                    <p id="title2">Results</p>
                </div>
                <div className="container5">
                    {list}
                </div>
            </div>
        );
    }

}

export default FinalPage;