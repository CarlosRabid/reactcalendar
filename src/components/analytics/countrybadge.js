 import React, { Component } from 'react';
    class hotCountry extends Component {
    render() {
    return <div><div>
    <img src="https://img.icons8.com/color/48/000000/crowd.png" />
</div> <div> {this.props.country} <br /> Hottest Country </div>
        
    </div>
    }
    }
    export default hotCountry;