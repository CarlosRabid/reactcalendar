import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import logo from './logo.svg';
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

// import Navbarcomp from './components/actions/navbarcomp'
// import Clients from './components/clients/clients';
// import Modal from 'react-bootstrap/Modal'
import Popup from './components/actions/popa';
// import Analytics from './components/analytics/analytics';
// import { LineChart, Line } from 'recharts';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { MDCRipple } from '@material/ripple';
import { FloatingActionButton } from "material-ui";
import { Add } from 'material-ui-icons';
import PropTypes from 'prop-types'

let dateFormat = PropTypes.any;
let dateRangeFormat = PropTypes.func;

const timeRangeStartFormat = ({ start }, culture, local) =>
  `${local.format(start, 't', culture)} — `

const timeRangeEndFormat = ({ end }, culture, local) => ` — ${local.format(end, 't', culture)}`

const timeRangeFormat = ({ start, end }, culture, local) =>
  `${local.format(start, 't', culture)} — ${local.format(end, 't', culture)}`

let localizer = momentLocalizer(moment)
// let allViews = Object.keys({Views}).map(k => console.log({Views}))

class App extends Component {
  constructor() {
    super();
    // this.getDatafromDB()
    this.state = {
      data: [],
      showPopup: false
    }

  }
  async componentDidMount() {
    // console.log(this.state.data)
    await this.getDatafromDB()
  }

  async getDatafromDB() {
    let data = await axios.get('http://localhost:4328/events')
    console.log(data.data)
    return this.setState({ data: data.data, showPopup: false })
  }

  togglePopup = (event) => {
    // console.log(e.target.id)
    console.log(event)
    this.setState({ showPopup: true })
    // this.props.togglePopup()
  }
  closePopup = () => {
    return this.setState({
      showPopup: null
    })
  }


  selecEvent = (event, e) => {
    return console.log(event, e)
  }

  getNow = () => {
    return new Date()
  }

  pushData = async (title, start, end, allDay, city, color) => {

    let data = {}
    console.log(end)
    // let data = [...this.state.data]
    // data.push({ name, country, owner })
    // let nclient = {name, country, owner}
    await axios.post('http://localhost:4328/pevent', {
      data: { title, start, end, allDay, city, color }
    })
    // this.setState({ data })
    console.log(data)
    return this.getDatafromDB()
  }
  render() {
    const { t, i18n } = this.props;
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
      console.log({ Views })
    };
    let formats = {
      // dateFormat: 'dd',
      // dayFormat: (date, format,  localizer) =>
      //   localizer.format(date, 'DDD', culture),
      eventTimeRangeFormat: dateRangeFormat,
      eventTimeRangeStartFormat: dateRangeFormat,
      eventTimeRangeEndFormat: dateRangeFormat
      // timeGutterFormat: 't'
    }

    return <div className="App">
      <BrowserRouter>
        <Route path="/" exact render={() =>
          <div className="calendar-container">
            <Button variant="outlined" onClick={this.togglePopup} name="showPopup" id="showPopup">Add Reminder</Button>
            {this.state.showPopup ? <Popup closePopup={this.closePopup} pushData={this.pushData} /> :
              <Calendar
                formats={formats}
                localizer={localizer}
                events={this.state.data}
                // startAccessor="start"
                // endAccessor="end"
                // getNow={this.getNow}
                culture="ES"
                style={{ height: 500 }}
                onSelectEvent={this.selecEvent}
                views={['month']}
              />}
          </div>
        }>
        </Route>
      </BrowserRouter>
    </div>
  }
}
export default withTranslation('translation')(App);
