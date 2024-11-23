const express = require('express');
const userRouter = express.Router();
const { authenticateUser } = require('../middleware/auth-user.js');
console.log(authenticateUser);

// import controllers to handle individual route requests/http methods
const { register, getCurrentUser, deleteUser } = require('../controllers/user.js');
console.log(register); // Should log the function definition
console.log(getCurrentUser); // Should log the function definition
console.log(deleteUser); // Should log the function definition




userRouter.post('/', register);
userRouter.get('/', authenticateUser, getCurrentUser);
userRouter.delete('/:id', authenticateUser, deleteUser);



module.exports = userRouter;