import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import DateInput from './DateInput';
import Selector from './select';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { faCheckSquare, faCalendarTimes, faStar, faStarHalfAlt, faStarHalf, faGrinStars, faStarOfLife, faBan } from '@fortawesome/free-solid-svg-icons'

const axios = require('axios')

class Editable extends React.Component {
    constructor(props) {
        super(props);
        let data = JSON.parse(this.props.selectEvent);
        data.start = moment(data.start).format('YYYY-MM-DD');
        data.end = moment(data.end).format('YYYY-MM-DD');
        data.value = data.color
        this.state = data
    }
    closeEdit = () => {
        this.props.closeEdit()
    }
    handleInput = (event) => {
        // console.log(event)
        let value = { ...this.state.value }
        // let date = state.daten
        // let time = state.timen
        value = event
        return this.setState(value)
    }

    update = async (event) => {
        let type = event.target.id
        if (type === 'undefined') {
            return
        } else {
            let state = { ...this.state }
            let value = event.target.value
            console.log(value)
            await this.setState({
                [type]: value
            })
        }
    }

    getCityData = async (cityName) => {
        let data = await axios.get('http://localhost:4328/event/' + cityName)
        console.log(data.data)
        return data.data
    }
    updateEvent = async (_id, title, start, end, allDay, city, color) => {

        await this.props.updateEvent(_id, title, start, end, allDay, city, color)
        return
    }
    allDaySelector = async (event) => {
        let allDay = { ...this.state.allDay }
        let end = { ...this.state.start }
        let start = { ...this.state.start }
        console.log(event.target.value)
        if (event.target.value === "true") {
            allDay = "true"
            start = moment(this.state.start).format('YYYY-MM-DD hh:mm:ss')
            end = moment(start).add(11, 'hours').format('YYYY-MM-DD hh:mm:ss')
            return this.setState({
                starten: start, enden: end, allDay: allDay,
                end: moment(end).format('YYYY-MM-DD')
            })

        } else {
            start = moment(this.state.start).format('YYYY-MM-DD hh:mm:ss')
            end = moment(...this.state.end).format('YYYY-MM-DD hh:mm:ss')
            allDay = "false"
            return this.setState({ starten: start, enden: end, allDay: allDay, end: moment(end).format('YYYY-MM-DD') })
        }
    }


    updateAction = async (e) => {
        let end = { ...this.state.end }
        let cityData = []
        let enden = { ...this.state.enden }
        // enden = (enden=='Invalid date') ? moment(this.state.end).add(12, 'hours').format('YYYY-MM-DD hh:mm:ss') 
        // : this.state.enden 
        cityData = await this.getCityData(this.state.city)
        // let obj = {_id, name: this.state.name, surname: this.state.surname, email: this.state.email}
        console.log(cityData)
        // await this.props.updateData('obj')
        if (window.confirm("Would you like to update changes made to your reminder ? ")) {
            end = moment(end).add(12, 'hours').format('YYYY-MM-DD')
            console.log(end)
            await this.updateEvent(this.state._id, this.state.title, this.state.start, this.state.end, this.state.allDay, this.state.city, this.state.value)
            alert('Updated!')
            return this.closeEdit()
        } else {
            return console.log(e)
        }

    }

    render() {
        let clients = []
        const marginLeft = '5%';
        const heightD = '10%';
        return (
            <div className='none'>
                <Dialog
                    fullScreen={false}
                    open={true}
                    onClose={this.closeEdit}
                    aria-labelledby="Review & Edit"
                >
                    <DialogContent>
                        <DialogContentText>Review & Edit</DialogContentText>
                        <TextField id="title" label="Reminder Title"
                            value={this.state.title} onChange={this.update} />
                        <div>Start date:
                     <input type="date" id="start"
                                placeholder={this.state.start}
                                start="start"
                                value={this.state.start}
                                onChange={this.update} />
                        </div>
                        <TextField id="city" label="City" value={this.state.city} onChange={this.update} />
                        <div>All Day event? :
                    <ToggleButtonGroup
                                value={this.state.allDay}
                                exclusive
                                onChange={this.allDaySelector}
                                aria-label="Yes"
                                style={{ justifyContent: "center" }}
                            >
                                <ToggleButton id="allDay" value="true" aria-label="All Day event"
                                    style={{ height: '6vh', justifySelf: "center" }}>
                                    <FontAwesomeIcon id="allDay" value="true" icon={faCheckSquare} />
                                </ToggleButton>
                                <ToggleButton id="allDay" value="false"
                                    style={{ height: '6vh', justifySelf: "center" }}
                                    color="secondary" aria-label="Range time">
                                    <FontAwesomeIcon icon={faCalendarTimes} id="allDay" value="false" />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <br />
                        {this.state.allDay === "" || this.state.allDay == "true" ?
                            <></> : <> End date: <input type="date" id="end"
                                placeholder={this.state.end}
                                start="start"
                                value={this.state.end}
                                onChange={this.update} />
                                <br />
                            </>
                        }
                        Assign Color:
                  <Selector colored={this.state.color} handleInput={this.handleInput} />
                    </DialogContent>
                    <DialogActions>
                        <button name={null} onClick={this.updateAction} >Update</button>
                        <button onClick={this.closeEdit} >Discard Changes</button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default Editable;