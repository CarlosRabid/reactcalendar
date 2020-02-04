# React Calendar App

Calendar scheduler built with React for Coding challenge 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

You need to have installed Node/npm, React and MongoDB. Rest of dependencies come with npm install command.

Install Node/npm from official documentation here

```
https://en.reactjs.org/docs/getting-started.html
```


Install React from here

```
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
```

and MongoDB here --> 

```
https://docs.mongodb.com/manual/installation
```


Once set up React and MongoDB continue installation...


### Installing

All dependencies included. Once in the project folder, run :

```
### `npm install`
```

This will install all necessary packages. Wait with a cup of coffee.

While installing, in the command shell, or system CMD 
(command prompt) you can start the command 'mongod',
necessary for mongodb connection.

Once command 'mongod' is executing and npm install has finished
then you can run in the project directory the command

```
### `npm start`
```

This runs the app in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Simultaneously run also the command

```
### `node server.js`
```

Runs the server for testing data persistency
and CRUD operations .


Initially you will see the following calendar 
 with no events scheduled.
![Initial](https://raw.githubusercontent.com/CarlosRabid/reactcalendar/master/public/inicaldesk.PNG "Initial Desktop")

## Running the tests: Add reminder

![IniMobile](https://raw.githubusercontent.com/CarlosRabid/reactcalendar/master/public/inicalmob.PNG "Initial ")

You can add a new reminder. Click the button on top left corner of the app.
A prompt will appear where you can input corresponding info. 
When you type a city name, an API request for weather forecast 
is made with the name of the city and date. 

![mobile](https://raw.githubusercontent.com/CarlosRabid/reactcalendar/master/public/schedulemob.PNG "Initial Mobile")

Before saving, info is displayed for confirmation.
Save if ready, discard if not. 

![addnew](https://raw.githubusercontent.com/CarlosRabid/reactcalendar/master/public/neweventmob.PNG "Initial Mobile")

## Review, update and delete a reminder

![update](https://raw.githubusercontent.com/CarlosRabid/reactcalendar/master/public/editeventmob.PNG "CRUD Ops")

For either action, simply select the reminder you want.
A prompt appears showing available info for reviewing,
updating input fields, or deleting  the selected reminder.
If you did any changes to the selected reminder, make
sure to submit them with the "Update" button.

### Delete all reminders and additional details

![empty](https://raw.githubusercontent.com/CarlosRabid/reactcalendar/master/public/emptycaldesk.PNG "Empty All")

On top of the calendar there's a red button with "EMPTY" label,
this allows the removal of all reminders submitted. 
Non-functional navigators were placed as future features.

![confirm](https://raw.githubusercontent.com/CarlosRabid/reactcalendar/master/public/emptycaldesk.PNG "Confirmation")

*App includes confirmation for creating, updating or deleting reminders.*

### Known bugs

There's a bug regarding event/reminder range visualization. Currently working on it. Dates
work good as well as CRUD operations. Should be only a matter of date format when
rendering the whole calendar component. Minor bug when updating most likely
produced by the component rendering the calendar.

## Built With

* [React](https://en.reactjs.org) - The web framework used,
* [MongoDB](https://mongodb.com/) - State manager, backend handler,
* [Weatherstack](https://weatherstack.com/) - Weather forecast API request.
* [Material UI](https://material-ui.com/) - Library for UI and light components.

## Contributing

CCN.

## Versioning

Versioning available in Github with proper tags. 

## Authors

* **Carlos Cornejo N.** [CarlosRabid ](https://github.com/CarlosRabid)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* old react-big-calendar used for template and styling time-consuming bypass.
* Bugs described in 'Known bugs'
* Excellent for knowledge/experience practice.
* Developed for challenge purposes.
