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
import { faCheckSquare, faCalendarTimes, faStar, faStarHalfAlt, faStarHalf, faGrinStars, faStarOfLife, faBan } from '@fortawesome/free-solid-svg-icons'

const axios = require('axios')

class Popup extends React.Component {
   constructor() {
      super();
      this.state = {
         title: "",
         start: "",
         end: "",
         allDay: "",
         starten: "",
         enden: "",
         city: "",
         color: ""
      }
   }
   closePopup = () => {
      this.props.closePopup()
   }

   handleInput = (event) => {
      let value = { ...this.state.value }
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
         await this.setState({
            [type]: value
         })
      }
   }

   getCityData = async (cityName) => {
      let data = await axios.get('http://localhost:4328/event/' + cityName)
      return data.data
   }

   pushData = async (title, start, end, allDay, city, color) => {
      await this.props.pushData(title, start, end, allDay, city, color)
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
         return this.setState({ starten: start, enden: end, allDay: allDay, end: moment(end).format('YYYY-MM-DD') })
      }
   }

   updateData = async (e) => {
      let end = { ...this.state.end }
      let cityData = []
      let enden = { ...this.state.enden }
      cityData = await this.getCityData(this.state.city)
      if (window.confirm("You have selected " + JSON.stringify(cityData.name)
         + " weather conditions of "
         + JSON.stringify(cityData.temperature)
         + " celsius and "
         + JSON.stringify(cityData.condition)
         + " please confirm reminder: ")) {
         end = moment(end).add(12, 'hours').format('YYYY-MM-DD')
         await this.pushData(this.state.title, this.state.start, this.state.end, this.state.allDay, this.state.city, this.state.value)
         alert('Saved!.')
         return this.closePopup()
      } else {
         return
      }
   }

   render() {
      const marginLeft = '5%';
      const heightD = '10%';
      return (
         <div className='none'>
            <Dialog
               fullScreen={false}
               open={true}
               onClose={this.closePopup}
               aria-labelledby="responsive-dialog-title"
            >
               <DialogContent>
                  <DialogContentText></DialogContentText>
                  <TextField id="title" label="New Reminder"
                     value={this.state.title} onChange={this.update}
                     inputProps={{ maxLength: 30 }} />
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
                  {this.state.allDay === "" || this.state.allDay == "true" ? <></>
                     : <> End date: <input type="date" id="end"
                        placeholder={this.state.end}
                        start="start"
                        value={this.state.end}
                        onChange={this.update} />
                        <br />
                     </>
                  }
                  Assign Color:
                  <Selector handleInput={this.handleInput} />
               </DialogContent>
               <DialogActions>
                  <button name={null} onClick={this.updateData} >Create</button>
                  <button onClick={this.closePopup} >Cancel</button>
               </DialogActions>
            </Dialog>
         </div>
      );
   }
}
export default Popup;