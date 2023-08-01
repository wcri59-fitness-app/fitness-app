const express = require('express');
path = require('path');
const db = require ('./models/TaskModel');

const app = express();
//to parse cookies if we want to add an authentication portion
const cookieParser = require('cookie-parser');
const PORT = 3000;

// all the parsers needed for backend
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// require controllers here
const cookieController = require("./controllers/cookieControllers");
const userController = require ("./controllers/userController");

// require routers
const workoutRouter = require("./router/workoutRouter")

// we only need this initial get request to the server to send our page to the client.
// all other routing to pages will be done on the front end
// without this code the frontend won't load the index.html
app.get('/', async (req, res) => {
  // const test = await db.query('SELECT * FROM Workouts');
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// all other route handling is done below for getting data, deleting data, updating data, etc.

app.use('/workout', workoutRouter);

//end point for signups
// do we need routers for signup and login? 
app.post('/signup', userController.createUser, (req, res) => {
  // res.redirect(200, '/Login')
  res.status(200);
})



//end point for logins
// logging in and out? how to make persisting session?
app.post('/login', userController.verifyUser, cookieController.setCookie, (req, res) => {
  res.redirect(200, '/');
})


 



app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {err: 'An error occurred'},
  };
  // console.log(err);
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
