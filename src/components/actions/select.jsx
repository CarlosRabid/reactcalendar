import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

class Selector extends Component {
    constructor() {
        super();
        this.state = {
            colors: ["#8e44ad", "#3498db",
                "#c0392b", "#f1c40f", "#d35400"
                // , "#2ecc71",
                // "#1abc9c", "#2c3e50", "#7f8c8d"
            ],
            selected: ""
        }
    }

    getColor = function (colours) {
        const Position = Math.floor(Math.random() * colours.length);
        return colours[Position];
    }

    handleInput = (event) => {

        let selected = {...this.state.selected}
        selected = event.target.value
        this.setState({selected})
        return this.props.handleInput(event.target)
    }

    render() {
        let colours = [...this.state.colors]
        return <div><Select
            labelId="colors"
            id="colors"
            value={colours}
            onChange={this.handleInput}
            renderValue={colours => `⚠️ `} //- ${colours}`}
            style={{backgroundColor: `${this.state.selected}`}}
        >
            <em>later</em>
            <MenuItem value="">
            </MenuItem>
            {colours.map(function(c) {
                return <MenuItem value={c} style={{backgroundColor: `${c}`}}>   </MenuItem>
            })
            //     < MenuItem value={10}>Green</MenuItem>
            // <MenuItem value={10}>Blue</MenuItem>
            // <MenuItem value={10}>Red</MenuItem>
            // <MenuItem value={20}>Grey</MenuItem>
            }
        </Select></div >
    }
}
export default Selector;