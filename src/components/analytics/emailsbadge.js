import React, { Component } from 'react';
class emailBadge extends Component {
    render() {
        let emailsCount = this.props.count
        return <><div>
            <img src="https://img.icons8.com/color/48/000000/send-mass-email.png" />
        </div> <div> {this.props.count} <br /> Emails Sent </div></>
    }
}
export default emailBadge;