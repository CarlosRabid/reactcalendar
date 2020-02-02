import React, { Component } from 'react';
import './actions.css'

class addClient extends Component {
    constructor() {
        super();
        this.state = {}
    }


// newClient = (e) => {
//     // console.log(e.target, this.state)
//     let type = e.target.name
//     let val = e.target.value

// }
inputValues = (e) => {
    // let state = { ...this.state }
    let type = e.target.name
    let value = e.target.value
    return this.setState({
        [type]: value
    })
    // let type = e.target.name
    // let value = e.target.value
    // this.setState({ input: { [type]: value } })
}
pushData = () => {
    // console.log(this.state)
    let name = this.state.fname + " " + this.state.surname
    
    this.props.pushData(name, this.state.country, this.state.owner)
}
render() {
    return <div id="nclient" className="addClient">
        <h3>Add Client</h3>
        <div> <input placeholder="First Name" className="input" name="fname" type="text" value={this.state.fname} onChange={this.inputValues} /></div>
        <div> <input placeholder="Surname" className="input" name="surname" type="text" value={this.state.surname} onChange={this.inputValues} /></div>
        <div> <input placeholder="Country" className="input" name="country" type="text" value={this.state.country} onChange={this.inputValues} /></div>
        <div> <input placeholder="Owner" className="input" name="owner" type="text" value={this.state.owner} onChange={this.inputValues} /></div>
        <button onClick={this.pushData} >Add New Client</button>
    </div>
}
}
export default addClient;