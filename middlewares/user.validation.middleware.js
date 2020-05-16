const { user } = require("../models/user");
const checkKeysMatching = require("../utils/index");
const { HTTP_STATUS_ERROR_QUERY } = require("../constants/index");
const UserService = require("../services/userService");

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  try {
    validateAll(req);
  } catch (err) {
    err.httpStatus = HTTP_STATUS_ERROR_QUERY;
    res.err = err;
  } finally {
    next();
  }
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  try {
    validateAll(req);
  } catch (err) {
    err.httpStatus = HTTP_STATUS_ERROR_QUERY;
    res.err = err;
  } finally {
    next();
  }
};

const validateAll = (req) => {
  const {
    body,
    body: { email, phoneNumber },
    params: { id = "" },
  } = req;

  if (!UserService.canSave({ email }, id)) {
    throw new Error(`Email of user ${email} is used already`);
  }

  if (!UserService.canSave({ phoneNumber }, id)) {
    throw new Error(`Phone number of user ${phoneNumber} is used already`);
  }
  if (!checkKeysMatching(user, body)) {
    throw new Error(
      `User entity is not valid. Expected keys ${Object.keys(user).join(",")}`
    );
  }

  if (!validateEmail(body)) {
    throw new Error(`Email of user must be as name@gmail.com`);
  }

  if (!validatePhone(body)) {
    throw new Error(`Phonenumber of user must be as +380xxxxxxxxx`);
  }

  if (!validatePassword(body)) {
    throw new Error(
      `Password of user must be non-empty string (min. length = 3)`
    );
  }

  if (!validateNames(body)) {
    throw new Error(`First name and last name of User must be filled!`);
  }
};

const validateEmail = ({ email }) => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    pattern.test(String(email).toLowerCase()) &&
    String(email).trimRight().toLowerCase().endsWith("@gmail.com")
  );
};

const validatePhone = ({ phoneNumber }) => {
  const pattern = /^\+380\d{9}$/;
  return pattern.test(String(phoneNumber));
};

const validatePassword = ({ password }) => {
  return typeof password == "string" && password.trim().length > 2;
};

const validateNames = ({ firstName, lastName }) => {
  return (
    typeof firstName == "string" &&
    firstName.trim().length > 0 &&
    typeof lastName == "string" &&
    lastName.trim().length > 0
  );
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
