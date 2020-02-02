import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Clients from '../clients/clients';

class Navbarcomp extends Component {
    constructor() {
        super();
        this.state = {
            clients: []
        }
    }
    async componentDidMount() {
        this.assign()
        // this.setState({clients: this.props.clients})
    }
    assign = ()=> {
        return this.setState({clients: this.props.clients})
    }

    render() {
        console.log(this.state)
        return <div >
            <Router>
                <div className="nav" >
                    <div className="nav-links" >
                        <Link to='/clients'>Clients </Link>
                        <Link to='/actions'>Actions </Link>
                        <Link to='/analytics'>Analytics </Link></div></div>
                {/* <Route path="/" render={() => <Navbarcomp clients={this.state.data} />} />
                <Route path="/clients" exact render={() => <Clients clients={this.props.clients} getDatafromDB={this.getDatafromDB} />} /> */}
                {/* <div><Route path="/clients" exact render={() => <Clients clients={this.props.clients}  />} />
    
    </div> */}
            </Router>
        </div>
    }
}
export default Navbarcomp;