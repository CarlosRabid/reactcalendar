import React, { Component } from 'react';
import Update from './actioupdate';
import Add from './actioadd';
import './actions.css'
class Actions extends Component {
    render() {
        return <div>
            <Update data={this.props.data} />
            <br></br>
            <Add  pushData={this.props.pushData} /></div>

    }
}
export default Actions;