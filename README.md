# React Calendar App

Calendar scheduler built with React for Coding challenge 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

You only need to have installed React and MongoDB. Rest of dependencies come with npm install command.
Install React from official documentation here
(https://en.reactjs.org/docs/getting-started.html)

and MongoDB here --> (https://docs.mongodb.com/manual/installation/) 


```
<!-- Give examples -->
```
Once set up, go ahead and continue installation...


### Installing

All dependencies included. Once in the project folder, run :

```
### `npm install`

This will install all necessary packages. Wait with a cup of coffee.
```

While installing, in the command shell, or system CMD 
(command prompt) you can start the command 'mongod',
necessary for mongodb connection.

```
Once command 'mongod' is executing and npm install has finished
then you can run in the project directory the command

### `npm start`

This runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


```
in order to start the application.
Simultaneously run also the command

### `node server.js`

Runs the server for reminder persistency
and CRUD operations availability .<br />


You will see the following screen 
initially without reminders.

## Running the tests: Add reminder

You can add a new reminder. Click the button on top left corner of the app.
A prompt will appear where you can input corresponding info. 
When you type a city name, an API request for weather forecast 
is made with the name of the city and date. Before saving, 
info is displayed for confirmation.
Save if ready, discard if not. 

## Review, update and delete a reminder

For either action, simply select the reminder you want.
A prompt appears showing available info for reviewing,
updating input fields, or deleting  the selected reminder.
If you did any changes to the selected reminder, make
sure to submit them with the "Update" button.

### Delete all reminders and additional details

On top of the calendar there's a red button with "EMPTY" label,
this allows the removal of all reminders submitted. 
Non-functional navigators were placed as future features.

```
<!-- Give an example
``` -->

### Known bugs

There's a bug regarding event range visualization. Currently working on it. Dates
work good as well as CRUD operations. Should be only a matter of date format when
rendering the whole calendar component.

```
<!-- Give an example -->
```

## Built With

* [React](https://en.reactjs.org) - The web framework used,
* [MongoDB](https://maven.apache.org/) - State manager, backend handler,
* [Weather](https://weatherstack.com/) - Weather forecast API request.

## Contributing

CCN.

## Versioning

Versioning available in Github with proper tags. 

## Authors

* **Carlos Cornejo N.** [CarlosRabid](https://github.com/CarlosRabid)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* old react-big-calendar used for template and styling time-consuming bypass.
* Excellent example for putting knowledge/experience into practice.
* For challenge purposes.
