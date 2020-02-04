import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Selector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: ["#8e44ad", "#3498db",
                "#c0392b", "#f1c40f", "#d35400"
            ],
            selected: this.props.colored
        }
    }

    handleInput = (event) => {
        let selected = { ...this.state.selected }
        selected = event.target.value
        this.setState({ selected })
        return this.props.handleInput(event.target)
    }

    render() {
        let colours = [...this.state.colors]
        return <div><Select
            labelId="colors"
            id="colors"
            value={this.props.colored}
            onChange={this.handleInput}
            renderValue={colours => ` Your color `} //- ${colours}`}
            style={{ backgroundColor: `${this.state.selected}` }}
        >
            <em>later</em>
            <MenuItem value="">
            </MenuItem>
            {colours.map(function (c) {
                return <MenuItem value={c} style={{ backgroundColor: `${c}` }}>   </MenuItem>
            })
            }
        </Select></div >
    }
}
export default Selector;