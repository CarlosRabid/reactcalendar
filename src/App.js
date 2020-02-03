import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import { Button } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom'
import './App.css';
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  globalizeLocalizer,
  move,
  Views,
  Navigate,
  components,
} from 'react-big-calendar'
import moment from 'moment'
import Popup from './components/actions/popa';
import axios from 'axios';
import { FloatingActionButton } from "material-ui";
import { Add } from 'material-ui-icons';
import PropTypes from 'prop-types'
import Editable from './components/actions/editable';

// let dateFormat = PropTypes.any;
let dateRangeFormat = PropTypes.func;

const style = {
  margin: 0,
  top: '81vh',
  right: '30vw',
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};
let localizer = momentLocalizer(moment)

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      showPopup: false,
      editmode: false
    }

  }
  async componentDidMount() {
    await this.getDatafromDB()
  }

  async getDatafromDB() {
    let data = await axios.get('http://localhost:4328/events')
    return this.setState({ data: data.data, showPopup: false, editmode: false })
  }

  async delEventfromDB(_id) {
    console.log(_id)
    if (window.confirm("Delete this reminder ? ")) {
      let data = await axios.delete('http://localhost:4328/delevent/' + `${_id}`)
      alert('Reminder Deleted!')
      return this.closeEdit()
    } else {
      return this.closeEdit()
    }
  }

  async delDatafromDB(eventid) {
    if (window.confirm("Are you sure you want to empty your reminders .")) {
      let data = await axios.delete('http://localhost:4328/empty', {})
      alert('Deleted!.')
      return this.setState({ data: [], showPopup: false })
    } else {
      return
    }
  }

  togglePopup = (event) => {
    this.setState({ showPopup: true })
  }

  closePopup = () => {
    return this.setState({
      showPopup: null
    })
  }

  closeEdit = () => {
    return this.setState({
      editmode: false
    })
  }

  selecEvent = (event) => {
    let editmode = { ...this.state.editmode }
    editmode = JSON.stringify(event)
    this.setState({ editmode })
    return
  }

  getNow = () => {
    return new Date()
  }

  pushData = async (title, start, end, allDay, city, color) => {
    let data = {}
    await axios.post('http://localhost:4328/pevent', {
      data: { title, start, end, allDay, city, color }
    })
    return this.getDatafromDB()
  }

  updateEvent = async (id, title, start, end, allDay, city, color) => {
    let data = {}
    await axios.put('http://localhost:4328/upevent', {
      data: { id, title, start, end, allDay, city, color }
    })
    return this.getDatafromDB()
  }

  render() {
    let formats = {
      eventTimeRangeFormat: dateRangeFormat,
      eventTimeRangeStartFormat: dateRangeFormat,
      eventTimeRangeEndFormat: dateRangeFormat
    }

    return <div className="App">
      <BrowserRouter>
        <Route path="/" exact render={() =>
          <div className="calendar-container">
            {/* <Button variant="outlined" onClick={this.togglePopup} name="showPopup" id="showPopup"
            >Add Reminder</Button> */}
            <br />
            <Button variant="contained" onClick={this.delDatafromDB}
              size='small' position='end' color="secondary" name="delete all" id="empty"
            >Empty ALL</Button>
            <br />
            <br />
            {this.state.editmode ? <Editable delEventfromDB={this.delEventfromDB}
              selectEvent={this.state.editmode} closeEdit={this.closeEdit} updateEvent={this.updateEvent} /> : <></>}

            {this.state.showPopup ? <Popup closePopup={this.closePopup} pushData={this.pushData} /> :
              <Calendar
                formats={formats}
                localizer={localizer}
                events={this.state.data}
                style={{ height: 500 }}
                onSelectEvent={this.selecEvent}
                views={['month']}
              />}
            <Fab variant='extended' onClick={this.togglePopup}
              name="showPopup" id="showPopup" color="default"
              aria-label="add" style={style} size='large'>New Reminder</Fab>
          </div>
        }>
        </Route>
      </BrowserRouter>
    </div>
  }
}
export default App;
