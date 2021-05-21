import React, { Component } from 'react';
import './Input.css';
import { create, all } from 'mathjs';

const config = { }
const math = create(all, config)

export default class input extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputString:'',
            errorMessage:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.calculateString = this.calculateString.bind(this)
    }

    handleChange = event => {
        this.setState({inputString: event.target.value});
    }

    handleClear = () => {
        this.setState({inputString: ""})
    }

    calculateString = () => {
        if (this.state.inputString === "") {
            this.setState({errorMessage: "Input is empty. :("});
            return;
        }
        this.setState({errorMessage: ""});
        try {
            let res = math.evaluate(this.state.inputString);
            let inputAndRes = this.state.inputString.concat("=" + res);
            this.setState({inputString:inputAndRes});
            this.props.socket.emit('handleCalculationLogs', inputAndRes);
        }
        catch (error) {
            this.setState({errorMessage: "ERROR: "+ error});
        }
    }

    render() {
        return(
            <div>
                <div>
                    <input class="input-group" type="text" value={this.state.inputString} onChange={this.handleChange} placeholder="Type e.g.: 1 + 1. Then press 'Calculate' button."/>
                    <div>
                        <button class="btn btn-primary" type="button" onClick={this.calculateString}>Calculate</button>
                        <button class="btn btn-danger" type="button" onClick={this.handleClear}>Clear</button>
                    </div>
                </div>
                <p class="error text-danger">{this.state.errorMessage}</p>
            </div>
        )
    }
}