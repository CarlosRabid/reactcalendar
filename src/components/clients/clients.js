import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { withTranslation } from 'react-i18next';
import Popup from './popa';
// import {MDCFoo, MDCFooFoundation} from '@material/foo';
import {FloatingActionButton} from "material-ui";
import {Add} from 'material-ui-icons';
import Fab from '@material-ui/core/Fab';
import {MDCRipple} from '@material/ripple';
import NavigationIcon from '@material-ui/icons/Navigation';
import AddIcon from '@material-ui/icons/Add';
// import {MDCMenu} from '@material/menu';

// const menu = new MDCMenu(document.querySelector('.mdc-menu'));
// menu.open = true;


// const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));


// import * as RNLocalize from "react-native-localize";
// let locat = RNLocalize.getLocales()[0]

// import Popup from 'reactjs-popup';

// class Popup extends Component {
//     render() {
//         return (
//             <div className='popup'>
//                 <div className='popup_inner'>
//                     <h1>txtexample</h1>
//                     <button onClick={this.props.closePopup}>close me</button>
//                 </div>
//             </div>
//         );
//     }
// }

class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            showPopup: null,
            usr: {
                name: "",
                surname: "",
                country: ""
            }
        }
    }
    async componentDidMount() {

        // await this.popState()
    }
    togglePopup(e) {
        // console.log(e.target.id)
        // console.log(e.target)
        this.setState({ showPopup: e.target.id })
        // this.props.togglePopup()
    }
    closePopup = () => {
        this.setState({
            showPopup: null
        })
    }

    posttoDB = (e) => {
        let clients = [...this.state.client]

        console.log(`posted to DB ${e.target.name}` + e.target.name)
    }
    displayPopa = async (e) => {
        let clients = this.props.clients

        clients = clients.filter(c => { return c._id == e.target.id })[0]
        // console.log(clients)
        // return <Modal animation={false}>
        //     <Modal.Header closeButton>
        //         <Modal.Title>Update Dhatha</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         {/* <span>Name: </span> <input id={clients._id} name={clients._id} type="text" placeholder={clients._id} value={this.state.usr.name}></input>
        //         <span>Surname: </span> <input id={clients._id} name={clients._id} type="text" placeholder={clients.surname} value={this.state.usr.surname}></input>
        //         <span>Country: </span> <input id={clients._id} name={clients._id} type="text" placeholder={clients.country} value={this.state.usr.country}></input> */}
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <button variant="secondary" >
        //             Close
        //    </button>
        //         <button variant="primary" >
        //             Save Changes
        //    </button>
        //     </Modal.Footer>
        // </Modal>
        return <Popup iden={clients._id} clients={this.state.clients} />
    }
    render() {
        const { t, i18n } = this.props;
        const changeLanguage = lng => {
            console.log(this.props)
            i18n.changeLanguage(lng);
        };
        // console.log(this.props)
        let clients = this.props.clients
        // console.log(this.props)
        return <>
            <button onClick={() => changeLanguage('en')}>en</button>
            <button onClick={() => changeLanguage('es')}>es</button>
            {this.state.showPopup ?
                <Popup updateData={this.props.updateData} clients={this.props.clients} id={this.state.showPopup} closePopup={this.closePopup} /> :
                null
            }<div className="tbl-header">
                <div>{t('Welcome to React')}</div>
                <table cellPadding="0" cellSpacing="0" >
                    <thead>
                        <tr>
                            <th>{t('Name')}</th>
                            <th>{t('email')}</th>
                            <th>{t('Sold')}</th>
                            <th>{t('Owner')}</th>
                            <th>{t('Country')}</th>
                        </tr>
                    </thead>
                </table>
            </div> <div className="tbl-content"><table cellPadding="0" cellSpacing="0" ><tbody>{clients.map(c => {
                return <tr onClick={this.togglePopup.bind(this)} className="client" name={c._id}>
                    <td id={c._id}> {c.name}
                    </td>
                    <td id={c._id}> {c.email}
                    </td>
                    <td id={c._id}> {c.sold ? "Yes" : "No"}</td>
                    {/* <td> {c.emailType}
                </td>
                </td> */}
                    <td id={c._id}> {c.owner}
                    </td>
                    <td id={c._id}> {c.country}
                    </td></tr>
            })}</tbody></table></div></>
    }
}
export default withTranslation('translation')(Clients);