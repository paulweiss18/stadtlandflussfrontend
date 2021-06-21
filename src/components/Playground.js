import {Component} from "react";


class Playground extends Component{

    render() {

        console.log(this.props.location.state.round);
        return (
        <p>Playground</p>
        );

    }

}

export default