import React, { Component } from 'react';
class outstandClients extends Component {
    render() {
        // let count = this.props.count
        return <><div>
            <img src="https://img.icons8.com/color/48/000000/crowd.png" />
        </div> <div> {this.props.count} <br /> Outstanding clients </div></>
    }
}
export default outstandClients;