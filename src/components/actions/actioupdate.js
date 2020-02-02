import React, { Component } from 'react';
import ActioInput from './actioinput';
class Update extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }

    }
    render() {
        // console.log(this.props)
        return <div>
            <h3>Update</h3>
            <span><ActioInput data={this.props.data} /></span>
            <div>Transfer ownership to: </div>
            <div>Send email: </div>
            <div>Declare Sale: </div>
        </div>
    }
}
export default Update;