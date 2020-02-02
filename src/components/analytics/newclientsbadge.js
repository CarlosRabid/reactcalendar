 import React, { Component } from 'react';
    class newClientsBadge extends Component {
    render() {
       let month = new Date()
       month = month.toLocaleString('en-us', { month: 'long' });
      //  console.log();
    return <><div>
       <img src="https://img.icons8.com/color/48/000000/conference-skin-type-7.png"/>
    </div> <div className="description"> {this.props.count} <br/> New {month} clients </div></>
    }
    }
    export default newClientsBadge;