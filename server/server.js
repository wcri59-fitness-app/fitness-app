const express = require('express');
path = require('path');
const app = express();
//to parse cookies if we want to add an authentication portion
const cookieParser = require('cookie-parser');
const PORT = 3000;

// all the parsers needed for backend
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// we only need this initial get request to the server to send our page to the client.
// all other routing to pages will be done on the front end
// without this code the frontend won't load the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// all other route handling is done below for getting data, deleting data, updating data, etc.

















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
