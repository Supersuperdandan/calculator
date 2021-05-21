import React, { Component } from 'react';

export default class CalculationLogs extends Component {
    render() {
        if (this.props.logs.length === 0){
            return (
                <p>Server connected. Try some calculations!</p>
            )
        }
        const reverseLogs = this.props.logs.reverse();
        return(
            <ul class="list-group">
                {reverseLogs.map(log => <li class="list-group-item">{log}</li>)}
            </ul>
        )
    }
}
