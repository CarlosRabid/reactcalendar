
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const PORT = 4328
const router = express.Router()
const request = require('request')

let moment = require('moment');
let apik = "b2161eb899566fc2f0ae04e26c218e36"
// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

app.use(express.static(path.join(__dirname, 'components')))
// app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/eventscal', { useNewUrlParser: true })

const Schema = mongoose.Schema
const eventsSchema = new Schema({
    // _id: false,
    title: String,
    start: Date,
    end: Date,
    allDay: Boolean,
    city: String
})
const citySchema = new Schema({
    name: { type: String, required: true },  //location.name
    updatedAt: Date,                        // 
    temperature: Number,
    condition: String,
    conditionPic: String
})

const eventscollection = mongoose.model('eventCalcollections', eventsSchema, 'eventCalcollections')
const citties = mongoose.model('city', citySchema)

let ncity
app.get('/event/:cityName', function (req, res) {
    let cityName = req.params.cityName

    request(`http://api.weatherstack.com/current?access_key=${apik}&query=${cityName}`,
    async function (error, result, data) {
            let cit = await JSON.parse(data)
            ncity = new citties({
                name: cit.location.name,  //location.name
                updatedAt: moment().format('ll'),                        // 
                temperature: cit.current.temperature,
                condition: cit.current.weather_descriptions[0],
                conditionPic: cit.current.weather_icons[0]
            })
            // console.log(ncity)
            res.send(ncity)
        })
})

app.get('/events', async function (req, res) {
    await eventscollection.find({}, function (err, result) {
        // result = JSON.parse(result)
        // console.log(result)
        res.send(result)
    })
})
app.post('/pevent', async function (req, res) {
    let data = req.body.data
    let end = moment(data.end).add(15, 'hours').format('YYYY-MM-DD hh:mm:ss')
    end = moment(end, moment.ISO_8601)
    
    console.log(end)
    let reminder = new eventscollection({
        title: data.title,
        start: moment(data.start), //Date
        end: moment(data.end), //Date
        allDay: data.allDay, //boolean 
        city: data.city //any
    })
    // nClt = JSON.stringify(nClt)
    console.log(reminder)
    reminder.save(
        res.send()
    )
    // await Tx.find({}, function (err, result) {
    //     console.log("getting route")
    // })
})

app.listen(PORT, function () {
    console.log('run')
})