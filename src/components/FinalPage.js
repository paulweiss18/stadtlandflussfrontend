import React, {Component} from 'react';

class FinalPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            lobbyObj: this.props.history.location.state.lobbyObj
        }
    }

    render() {
        return (
            <div>
                <p>Winner</p>
                <p></p>
            </div>
        );
    }

}

export default FinalPage;