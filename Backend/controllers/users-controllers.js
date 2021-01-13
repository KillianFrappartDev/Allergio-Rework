const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Local imports
const User = require('../models/user');

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new Error('[GET][USERS] Could not find user.'));
  }

  console.log('[GET][USERS] User found!');
  res.json({ user: user });
};

const signup = async (req, res, next) => {
  console.log(req.body);
  const { email, password, name, lastName } = req.body;

  const invalid = validationResult(req);
  if (!invalid.isEmpty()) {
    return next(new Error('[POST][USERS] Invalid inputs.'));
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new Error('[POST][USERS] Could not find existing user.'));
  }

  if (existingUser) {
    return next(new Error('[POST][USERS] An account for the provided Email already exists.'));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new Error('[POST][USERS] Hashing password failed.'));
  }

  const newUser = new User({
    email,
    password: hashedPassword,
    name,
    lastName,
    profiles: [],
    allergens: [],
    contacts: [],
    sharedProfiles: [],
    sharedContacts: []
  });

  let token;

  try {
    token = await jwt.sign({ userId: newUser.id }, process.env.SECRET);
  } catch (error) {
    return next(new Error('[POST][USERS] Could not create token'));
  }

  try {
    await newUser.save();
  } catch (error) {
    return next(new Error('[POST][USERS] Could not sign user up.'));
  }

  console.log('[POST][USERS] User signed up!');
  res.json({
    message: 'New user signed up!',
    token,
    user: newUser,
    access: true
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return next(new Error('[POST][USERS] Could not log user in.'));
  }

  if (!user) {
    return next(new Error('[POST][USERS] Login failed (no corresponding email found).'));
  }

  let decodedPassword = false;
  try {
    decodedPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    return next(new Error('[POST][USERS] Login failed (password is wrong).'));
  }

  let token;
  try {
    token = await jwt.sign({ userId: user.id }, process.env.SECRET);
  } catch (error) {
    return next(new Error('[POST][USERS] Login failed (could not create token).'));
  }

  if (decodedPassword) {
    res.json({
      message: '[POST][USERS] User logged in!',
      token,
      user,
      access: true
    });
  } else {
    res.json({ message: '[POST][USERS] Wrong credentials, try again.', access: false });
  }
};

const editUser = async (req, res, next) => {
  const userEdit = req.body.user;
  const id = req.body.user._id;

  try {
    user = await User.findOne({ _id: id });
  } catch (error) {
    return next(new Error('[POST][USERS] Could not log user in.'));
  }

  if (!user) {
    return next(new Error('[POST][USERS] Login failed (no corresponding id found).'));
  }

  let token;
  try {
    token = await jwt.sign({ userId: user.id }, process.env.SECRET);
  } catch (error) {
    return next(new Error('[POST][USERS] Login failed (could not create token).'));
  }
  Object.keys(userEdit).map(key => (user[key] = userEdit[key]));

  try {
    user.save();
  } catch (error) {
    return next(new Error('[PUT][PROFILES] Could not update profile.'));
  }

  console.log('[PUT][user] User updated!');
  res.json({
    message: "'[PUT][user] User updated!'",
    user
  });
};

exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
exports.editUser = editUser;
