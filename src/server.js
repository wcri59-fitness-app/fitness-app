const express = require('express');

const app = express();
const PORT = 3000;


app.get('/', () => {
    return res.status(200).send('hello world');
})

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }, 
    };
    // console.log(err);
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
  
    return res.status(errorObj.status).send(errorObj.message);
  });


app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); 