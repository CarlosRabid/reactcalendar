const express = require('express')
const router = express.Router()
let apik = "b2161eb899566fc2f0ae04e26c218e36"
var moment = require('moment');
let City = require('./src/components/model/City')
const request = require('request')
// moment().format();

let ncity
router.get('/event/:cityName', function (req, res) {
    let cityName = req.params.cityName

    request(`http://api.weatherstack.com/current?access_key=${apik}&query=${cityName}`, function (error, res, data) {
        let cit = JSON.parse(data)
        let arrayCit = [cit]
        // let result = processed.results
        ncity = new City({
            name: cit.location.name,  //location.name
            updatedAt: moment().format('ll'),                        // 
            temperature: cit.current.temperature,
            condition: cit.current.weather_descriptions[0],
            conditionPic: cit.current.weather_icons[0]
        })
        // ncity.save()
        //     arrayRecipes.push(food)
        // });
        // console.log(ncity)
    })

    res.send(ncity)
    // res.send(ncity)
})
module.exports = router
