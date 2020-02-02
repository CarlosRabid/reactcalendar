import React, { Component } from 'react';
import NewClient from './newclientsbadge';
import Sentemail from './emailsbadge';
import Clientsbadge from './outstandingbadge';
import CountryHot from './countrybadge';
class Badges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
        // console.log('this')
    }
    async componentDidMount() {
        // let country = await this.mostFrequent(this.state.data)
    }

    render() {
        function mostFrequent (array) {
            let map = array.map((a) => array.filter((b) => a.country === b.country).length);
            // console.log(map)
            return array[map.indexOf(Math.max.apply(null, map))];

        }
        let nClients = [...this.state.data]
        let newDate = new Date()
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let newClientsCount = nClients.filter(nc => {
            let datex = new Date(nc.firstContact)
            return ((datex.getMonth() + 1) == month && datex.getFullYear() >= year)
        })

        let emails = nClients.filter(nc => {
            return nc.email == null
        })
        let outstanding = nClients.filter(nc => {
            return nc.sold != true
        })
        let hotCountry = mostFrequent([...this.state.data])
        hotCountry = hotCountry ? hotCountry.country : hotCountry
        // console.log(hotCountry)

        return <>
            <span name="nclients"><NewClient count={newClientsCount.length} /> </span>
            <span name="sentmail"><Sentemail count={emails.length} /> </span>
            <span name="leftclients"><Clientsbadge count={outstanding.length} /> </span>
            <span name="hcountry"><CountryHot country={hotCountry} /> </span>

        </>
    }
}
export default Badges;