// import React, { Component } from 'react';
// import { LineChart, Line } from 'recharts';

import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './chart.css';

export default class Charts extends PureComponent {
    // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/7has60ua/';
    constructor(props) {
        super(props);
        // console.log(props)
        // const data = this.props.data;

        this.state = {
            data: [],
            activeIndex: 0,
        };
    }

    handleClick = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    }

    render() {
        // debugger
        let countries = (this.props.data);
        countries = countries.filter(c => {
            return c.sold !== null
        })
        let counts = {};
        let arrCounts = [];
        // console.log(countries)

        for (let i = 0; i < countries.length; i++) {
            // debugger
            if (!counts.hasOwnProperty(countries[i].country)) {
                counts[countries[i].country] = 1;
            }
            else {
                counts[countries[i].country]++;
            }
        }
        for (let [key, value] of Object.entries(counts)) {
            arrCounts.push({ name: key, count: value })
            // console.log(`${key}: ${value}`);
        }
        const { activeIndex } = this.state;
        const activeItem = arrCounts[activeIndex];


        // debugger

        return (
                <div className="charts">
                <BarChart width={1000} height={333} data={arrCounts} >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" onClick={this.handleClick}>
                        {
                            arrCounts.map((entry, index) => (
                                <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                            ))
                        }
                    </Bar>
                </BarChart>
                {/* <p className="content">{`Uv of "${activeItem}": ${activeItem}`}</p> */}
            </div>
        );
    }
}

    // class Charts extends Component {
    // render() {
    // return <div>
    //     <div>
    //         <h3>Sales by </h3>
    //     </div>
    //     <div>Chart down here</div>
    // </div>
    // }
    // }
    // export default Charts;