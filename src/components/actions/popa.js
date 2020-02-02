import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import DateInput from './DateInput';


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
         allDay: "",
         daten: "",
         timen: "",
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
      let state = { ...this.state }
      let type = event.target.id
      let value = event.target.value
      console.log(value)
      await this.setState({
         [type]: value
      })
      // console.log(state)
   }
   getCityData = async (cityName) => {
      let data = await axios.get('http://localhost:4328/event/'+cityName)
      console.log(data.data)
      return data.data
  }
   updateData = async (e) => {
      let cityData = []
      // let state = { ...this.state }
      // let _id = e.target.name
      cityData = await this.getCityData(this.state.city)
      // let obj = {_id, name: this.state.name, surname: this.state.surname, email: this.state.email}
      console.log(cityData)
      // await this.props.updateData('obj')
      if (window.confirm("Ha seleccionado "+JSON.stringify(cityData.name)
      +" condiciones de "
      +JSON.stringify(cityData.temperature)
      +" grados y "
      +JSON.stringify(cityData.condition)
      +" desea confirmar su recordatorio:")){
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
               <div>Title:
                  <input type="text"
                     placeholder={''} id="title"
                     value={this.state.title}
                     onChange={this.update} />
               </div>
               <div>Start date:
               <input type="date" id="start"
                     placeholder={this.state.start}
                     start="start"
                     value={this.state.start}
                     onChange={this.update} />
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
                     <Grid container justify="space-between" style={{ marginLeft: '7%' }}>
                        <div >
                           <KeyboardDatePicker
                              margin="none"
                              id="date"
                              label='Date From'
                              format="dd/mm/yyyy"
                              value={moment(this.state.daten, 'dd/mm/yyyy').toDate()}
                              // defaultValue={this.state.date}
                              onChange={this.handleInput}
                              KeyboardButtonProps={{
                                 'aria-label': 'Date',
                              }}
                              InputLabelProps={{ shrink: true }}
                              style={{ height: heightD, marginLeft, width: '42%' }}
                              variant="standard"
                              size="small"
                              helperText={false}
                           // type="date"

                           />
                           <KeyboardTimePicker
                              margin="none"
                              variant="standard"
                              // id="date"
                              id="time"
                              label='Time From'
                              format="HH:mm"
                              // defaultValue="15:02"
                              value={moment(this.state.timen, 'HH:mm').toDate()}
                              onChange={this.handleInput}
                              KeyboardButtonProps={{
                                 'aria-label': 'Time From',
                              }}
                              // className="dateinput"
                              style={{ height: heightD, marginLeft, width: '23%' }}
                              InputLabelProps={{ shrink: true }}
                              helperText={false}
                              size="small"
                           />
                        </div>
                     </Grid>
                  </MuiPickersUtilsProvider> */}
                  {/* 
                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <Grid container justify="space-around">
                        <KeyboardDatePicker
                           disableToolbar
                           variant="inline"
                           format="MM/dd/yyyy"
                           margin="normal"
                           id="date-picker-inline"
                           label="Date picker "
                           value={this.state.daten}
                           onChange={this.handleInput}
                           KeyboardButtonProps={{
                              'aria-label': 'change date',
                           }}
                        />
                        <KeyboardTimePicker
                           margin="normal"
                           id="time-picker"
                           label="Time picker"
                           value={this.state.timen}
                           onChange={this.handleInput}
                           KeyboardButtonProps={{
                              'aria-label': 'change time',
                           }}
                        />
                     </Grid>
                  </MuiPickersUtilsProvider> */}

                  {/* <DateInput /> */}
               </div>
               <div>City: <input type="text" 
               placeholder={''} id="city" 
               value={this.state.city} 
               onChange={this.update} /></div>
               <div>All Day:
                  {/* <input type="text" placeholder={''} 
               allDay="allDay" value={this.state.allDay} onChange={this.update} /> */}
                  <input type="radio" id="allDay" value="true" onChange={this.update} /> All Day
                  <input type="radio" id="allDay" value="false" onChange={this.update} /> Range
               </div>
               <button name={null} onClick={this.updateData} >Update</button>
               <button onClick={this.closePopup} >Discard Changes</button>
            </div>
         </div>
      );
   }
}


// class Popa extends Component {
//    constructor() {
//       super();
//       console.log('popa')
//       this.state = {
//          clients: []
//       }

//    }
//    componentDidMount() {
//       let clients = this.props.clients
//       this.setState({ clients })
//       console.log('popa31')
//    }

//    // const [show, setShow] = useState(false);
//    // this.setState({show: true})
//    // const [show, setShow] = useState(false);

//    // const handleClose = () => setShow(false);
//    // const handleShow = () => setShow(true);
//    render() {
//       console.log(this.props)
//       let _id = this.props.iden
//       let clients = [...this.state.clients]
//       clients = clients.filter(c => {
//          return clients._id === _id
//       })[0]
//       return clients.map(c => {
//         return <>
//             <Modal animation={false}>
//                <Modal.Header closeButton>
//                   <Modal.Title>Update Dhatha</Modal.Title>
//                </Modal.Header>
//                <Modal.Body>
//                   <span>Name: </span> <input id={clients._id} name={clients._id} type="text" placeholder={clients._id} value={this.state.usr.name}></input>
//                   <span>Surname: </span> <input id={clients._id} name={clients._id} type="text" placeholder={clients.surname} value={this.state.usr.surname}></input>
//                   <span>Country: </span> <input id={clients._id} name={clients._id} type="text" placeholder={clients.country} value={this.state.usr.country}></input>
//                </Modal.Body>
//                <Modal.Footer>
//                   <button variant="secondary" >
//                      Close
//                   </button>
//                   <button variant="primary" >
//                      Save Changes
//                   </button>
//                </Modal.Footer>
//             </Modal>
//          </>
//       })
//    }
// }


export default Popup;