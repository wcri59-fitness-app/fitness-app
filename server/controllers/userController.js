const db = require("../models/TaskModel")
userController = {};

userController.createUser = (req, res, next) => {
   const {username, password} = req.body;
   const signupQuery = 'INSERT INTO Users (username, password) VALUES ($1, $2)';
   db.query(signupQuery, [username, password])
     .then((data) => {
       res.locals.id = data;
       console.log(data);
       return next();
     })
     .catch((err) => {
       return next({
         log: 'Error occured in UserController.createUser',
         message: {err: 'wrong information passed in'},
       });
     });
}

userController.verifyUser = (req, res, next) => {
const {username, password} = req.body;
const loginQuery = 'SELECT * FROM Users WHERE username = $1 AND password = $2';
db.query(loginQuery, [username, password])
  .then((loginUser) => {
    if (loginUser === null) {
      res.locals.user = 'Username and Password Not Found';
      return next();
    } else {
      console.log(loginUser.rows[0])
      res.locals.userID = loginUser.rows[0].user_id;
      return next();
    }
  })
  .catch((err) => {
    return next({
      log: 'Error occured in UserController.createUser',
      message: {err: 'wrong information passed in'},
    });
  });
}

module.exports = userController;
