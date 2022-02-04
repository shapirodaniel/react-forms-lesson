const express = require('express');
const usersRouter = express.Router();
const { User } = require('../db');

module.exports = usersRouter;

usersRouter.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.getUserAndAddresses(req.params.userId);
    res.send(user);
  } catch (err) {
    next(err);
  }
});
