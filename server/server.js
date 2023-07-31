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
app.post('/signup', (req, res) => {
  const {username, password} = req.body;
   const signupQuery ='INSERT INTO Users (username, password) VALUES ($1, $2)';
  db.query(signupQuery, [username, password])
    .then((data) => {
      res.locals.id = data;
      console.log(data)
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error occured in UserController.createUser',
        message: {err: 'wrong information passed in'},
      });
    });
})

//end point for logins
// logging in and out? how to make persisting session?
app.get('/login', (req, res) => {
const {username, password} = req.body;
const loginQuery = 'SELECT * FROM Users WHERE username = $1 AND password = $2';
db.query(loginQuery, [username, password])
  .then((data) => {
    if (data === null) {
      res.locals.user = "Username and Password Not Found";
      return next()
    } else {
    res.locals.data = data;
    console.log(data);
    return next();
    }
  })
  .catch((err) => {
    return next({
      log: 'Error occured in UserController.createUser',
      message: {err: 'wrong information passed in'},
    });
  });
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
