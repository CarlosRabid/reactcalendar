 import React, { Component } from 'react';
import Badges from './abadges';
import Charts from './chartComp';
import './badges.css';
import { LineChart, Line } from 'recharts';

    class Analytics extends Component {
        constructor(props){
            super(props);
            // props.getDatafromDB()
            // debugger
            console.log(props, this.props)
            this.state={
                data: props.data
            } 
        }
         componentDidMount(){
            // this.props.getDatafromDB()

        }
        getDatafromDB = () => {
        }
    render() {
    return <div className="analytics">
        <div className="badges" id="badges">
            <Badges data={this.props.data} />
        </div>
        <hr/>
        <h5>Sales by country </h5>
        <div className="charts">
            <Charts data={this.state.data} />
        </div>
    </div>
    }
    }
    export default Analytics;