import React, { Component } from 'react';
import Search from 'react-search'

class ActioInput extends Component {
   constructor(props) {
      super(props)
      console.log(props)
      let data = props.data
      this.state = {
         data: data,
         repos: {
            name: "",
            owner: "",
            email: "",
            sold: Boolean,
         }
      }
   }


   getItemsAsync (searchValue, cb) {
      debugger
      console.log(this.state.data)
      let results = [...this.state.data]
      // console.log(results)
      if (results != undefined) {

         let items = results.map((res, i) => {
            return { _id: res._id, name: res.name }
         })
         this.setState({ repos: items })
         console.log(this.state)
         console.log(searchValue)
         cb(searchValue)
      }
   }
   async HiItems(items) {
      // console.log(items[0].value)
      let resultados = await this.props.data.filter(d =>{
         // let item = items[0]
         return d.name == items.value
      })[0]
      console.log(items[0])

   }

   render() {
      let items = this.props.data
      items = items.map(i => { return { id: i._id, value: i.name, owner: i.owner, email: i.email, sold: i.sold  } })
      return (
         <div>
            {/* <span> */}
            Client:
            {/* <Search items={items} /> */}
            <Search items={items}
               placeholder='Client Name'
               maxSelected={1}
               multiple={false}
               getItemsAsync={this.getItemsAsync.bind(this)}
               onItemsChanged={this.HiItems.bind(this)} />
            {/* <Search items={items}
               multiple={false}
               getItemsAsync={this.getItemsAsync.bind(this)}
               onItemsChanged={this.HiItems.bind(this)} /> */}
            {/* </span> */}
         </div>
      )
   }
}
export default ActioInput;