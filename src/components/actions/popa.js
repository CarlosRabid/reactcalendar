import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import DateInput from './DateInput';
import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCalendarTimes, faStar, faStarHalfAlt, faStarHalf, faGrinStars, faStarOfLife, faBan } from '@fortawesome/free-solid-svg-icons'



const axios = require('axios')
// import '../../App.css';
// import Popup from 'reactjs-popup';

class Popup extends React.Component {
   constructor() {
      super();
      this.state = {
         title: "",
         start: "",
         end: "",
         allDay: "false",
         starten: "",
         enden: "",
         city: ""
      }
   }
   closePopup = () => {
      this.props.closePopup()
   }
   handleInput = (event) => {
      let state = { ...this.state }
      // let date = state.daten
      // let time = state.timen
      state.daten = moment(event).format('DD/MM/YYYY')
      state.timen = moment(event).format('HH:mm')
      this.setState(state.daten, state.timen)
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
   pushData = async (title, start, end, allDay, city) => {

      await this.props.pushData(title, start, end, allDay, city)
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
         end = moment(start).add(23, 'hours').format('YYYY-MM-DD hh:mm:ss')
         await this.setState({ starten: start, enden: end, allDay: allDay,
         end: moment(end).format('YYYY-MM-DD') })
         return console.log(end)
      } else {
         allDay = "false"
         return this.setState({ allDay })
      }
   }


   updateData = async (e) => {
      let cityData = []
      // let state = { ...this.state }
      // let _id = e.target.name
      cityData = await this.getCityData(this.state.city)
      // let obj = {_id, name: this.state.name, surname: this.state.surname, email: this.state.email}
      console.log(cityData)
      // await this.props.updateData('obj')
      if (window.confirm("Ha seleccionado " + JSON.stringify(cityData.name)
         + " condiciones de "
         + JSON.stringify(cityData.temperature)
         + " grados y "
         + JSON.stringify(cityData.condition)
         + " desea confirmar su recordatorio:")) {
            this.pushData(this.state.title, this.state.start, this.state.end, this.state.allDay, this.state.city)
            alert('Successful')
         return this.closePopup()
         // break
      } else {
         return console.log(e)
      }

   }

   render() {
      let clients = []
      const marginLeft = '5%';
      const heightD = '10%';
      return (
         <div className='popup'>
            <div className='popup\_inner'>
               <h4>Update</h4>
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
               {this.state.allDay === "true" ?
                  <></> : <>'End date:' <input type="date" id="end"
                     placeholder={this.state.end}
                     start="start"
                     value={this.state.end}
                     onChange={this.update} />
                     <br></br>
                  </>
               }
               <button name={null} onClick={this.updateData} >Update</button>
               <button onClick={this.closePopup} >Discard Changes</button>
            </div>
         </div>
      );
   }
}
export default Popup;