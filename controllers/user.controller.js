const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const userModel = require('../models/User.model');

// mock

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { email, firstName, lastName } = req.body;

    if (!email || !firstName || !lastName) {
      return res
        .status(400)
        .json({ message: 'email, firstName, lastName fields are required' });
    }

    const user = await userModel.create({ email, firstName, lastName });

    res.status(201).json(user);
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'email field is required' });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }

    return res.status(200).json(user);
  })
);

module.exports = router;
