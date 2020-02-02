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

import result from './components/clients/data.json';
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



let localizer = momentLocalizer(moment)
// let allViews = Object.keys({Views}).map(k => console.log({Views}))

// Views[k])



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
    // let data = [ 
    // {title: 'Test31/01', //string
    //   start:  new Date(), //Date
    //   end:  new Date(), //Date
    //   allDay : true , //boolean 
    //   resource : 'resource' //any
    // } ]
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
  this.setState({
      showPopup: null
  })
}

  updateData = (obj) => {
    let data = [...this.state.data]
    let client = data.find(c => {
      return c["_id"] === obj._id
    })
    let name = obj.name + " " + obj.surname
    console.log('pushed app array')
    console.log(client)
    data = data.map(d => {
      if (d._id === obj._id) {
        d.name = name;
        d.email = obj.email
        // break
      }
      return d
    })
    this.setState({ data })
    // this.setState({clients})
  }
  pushData = async (title, start, end, allDay, resource) => {

    let data = {}
    // let data = [...this.state.data]
    // data.push({ name, country, owner })
    // let nclient = {name, country, owner}
    await axios.post('http://localhost:4328/pevent', {
      data: { title, start, end, allDay, resource }
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
    return <div className="App">
      <BrowserRouter>
        <Route path="/" exact render={() =>
          <div className="calendar-container">
            <Button variant="outlined" onClick={this.togglePopup} name="showPopup" id="showPopup">Add reminder</Button>
            {this.state.showPopup ? <Popup closePopup={this.closePopup}/> :
            <Calendar popup='true'
              localizer={localizer}
              events={this.state.data}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              // onDoubleClickEvent={this.togglePopup}
            // views={{Views}}
            // showMultiDayTimes
            // defaultDate={moment('2020/2/01')}
            />}
          </div>
        }>
        </Route>
      </BrowserRouter>
    </div>
  }
}
export default withTranslation('translation')(App);
