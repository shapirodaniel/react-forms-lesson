const express = require('express');
const usersRouter = express.Router();
const { User, Address } = require('../db');

module.exports = usersRouter;

usersRouter.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.getUserAndAddresses(req.params.userId);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

usersRouter.post('/:userId/addresses', async (req, res, next) => {
  try {
    const {
      // address fields
      street_number,
      street_address,
      city_name,
      state_abbrev_name,
      country_name,
      zipcode,
      domicile_type,
      // user address fields
      is_primary,
    } = req.body;

    const address = await Address.createAddress(
      {
        street_number,
        street_address,
        city_name,
        state_abbrev_name,
        country_name,
        zipcode,
        domicile_type,
      },
      { user_id: req.params.userId, is_primary }
    );

    res.send(address);
  } catch (err) {
    next(err);
  }
});
