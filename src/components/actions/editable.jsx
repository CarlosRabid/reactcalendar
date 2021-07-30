import React, { Component } from 'react';
import moment from 'moment';
import Selector from './select';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button';
import { faCheckSquare, faCalendarTimes, faTrash} from '@fortawesome/free-solid-svg-icons'

const axios = require('axios')

class Editable extends React.Component {
    constructor(props) {
        super(props);
        let data = JSON.parse(this.props.selectEvent);
        data.start = moment(data.start).format('YYYY-MM-DD');
        data.end = moment(data.end).format('YYYY-MM-DD');
        data.value = data.color
        data.color = data.color
        this.state = data
    }
    closeEdit = () => {
        this.props.closeEdit()
    }
    handleInput = (event) => {
        let color = { ...this.state.color }
        color = event
        return this.setState(color)
    }

    update = async (event) => {
        let type = event.target.id
        if (type === 'undefined') {
            return
        } else {
            let value = event.target.value
            await this.setState({
                [type]: value
            })
        }
    }

    getCityData = async (cityName) => {
        let data = await axios
            .get('http://localhost:4328/event/' + cityName)
        return data.data
    }

    updateEvent = async (_id, title, start, end, allDay, city, color) => {
        await this.props.updateEvent(_id,
            title, start, end, allDay,
            city, color)
        return
    }

    delEventfromDB = async (event) => {
        await this.props.delEventfromDB(this.state._id)
        return
    }

    allDaySelector = async (event) => {
        let allDay = { ...this.state.allDay }
        let end = { ...this.state.start }
        let start = { ...this.state.start }
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
            return this.setState({
                starten: start,
                enden: end, allDay: allDay,
                end: moment(end).format('YYYY-MM-DD')
            })
        }
    }

    updateAction = async (e) => {
        let end = { ...this.state.end }
        let cityData = []
        let enden = { ...this.state.enden }
        let state = { ...this.state }
        cityData = await this.getCityData(this.state.city)
        if (window.confirm("Would you like to update changes made to your reminder ? ")) {
            end = moment(end).add(12, 'hours').format('YYYY-MM-DD')
            await this.updateEvent(state._id, state.title, state.start, state.end,
                state.allDay, state.city, state.value)
            alert('Updated!')
            return this.closeEdit()
        } else { return }
    }

    render() {
        return (
            <div className='none'>
                <Dialog
                    fullScreen={false}
                    open={true}
                    onClose={this.closeEdit}
                    aria-labelledby="Review , Update & Delete"
                >
                    <DialogContent>
                        <DialogContentText>Review, Update & Delete</DialogContentText>
                        <br />
                        <TextField id="title" label="Reminder Title"
                            value={this.state.title} onChange={this.update} />
                        <br />
                        <br />
                        <div>Start date:
                         <input type="date" id="start"
                                placeholder={this.state.start}
                                start="start"
                                value={this.state.start}
                                onChange={this.update} />
                        </div>
                        <TextField id="city" label="City" value={this.state.city} onChange={this.update} />
                        <br />
                        <br />
                        <div>All Day event? :
                    <ToggleButtonGroup
                                value={this.state.allDay}
                                exclusive
                                onChange={this.allDaySelector}
                                aria-label="Yes"
                                style={{ justifyContent: "center" , marginLeft: '5%'}}
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
                            <br />
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
                        <br />
                        Assign Color:
                  <Selector colored={this.state.color} handleInput={this.handleInput} />
                    </DialogContent>
                    <br />
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="secondary"
                            value={this.state._id}
                            size="small"
                            id={this.state._id}
                            startIcon={<FontAwesomeIcon id={this.state._id}
                                onClick={this.delEventfromDB}
                                value={this.state._id} icon={faTrash} />}
                        ></Button>
                        <button name={null} onClick={this.updateAction} >Update</button>
                        <button onClick={this.closeEdit} >Discard Changes</button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default Editable;