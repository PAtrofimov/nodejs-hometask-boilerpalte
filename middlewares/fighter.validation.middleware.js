const { fighter } = require("../models/fighter");
const checkKeysMatching = require("../utils/index");
const { HTTP_STATUS_ERROR_QUERY } = require("../constants/index");
const FighterService = require("../services/fighterService");

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  try {
    validateAll(req);
  } catch (err) {
    err.httpStatus = HTTP_STATUS_ERROR_QUERY;
    res.err = err;
  } finally {
    next();
  }
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
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
    body: { name },
    params: { id = "" },
  } = req;

  if (!FighterService.canSave({ name }, id)) {
    throw new Error(`Fighter name ${name} is used already!`);
  }

  if (!checkKeysMatching(fighter, body)) {
    throw new Error(
      `Fighter entity is not valid. Expected keys ${Object.keys(fighter).join(
        ","
      )}`
    );
  }

  if (!validatePower(body)) {
    throw new Error(`Power of fighter must be integer number > 0`);
  }

  if (!validateHealth(body)) {
    throw new Error(`Health of fighter must be integer number from 1 to 100`);
  }

  if (!validateName(body)) {
    throw new Error(`Name of fighter must be non-empty string`);
  }

  if (!validateDefense(body)) {
    throw new Error(`Defense of fighter must be integer number from 1 to 10`);
  }
};

const validatePower = ({ power }) => {
  return typeof power == "number" && Number.isInteger(power) && power >= 0;
};

const validateDefense = ({ defense }) => {
  return (
    typeof defense == "number" &&
    Number.isInteger(defense) &&
    defense >= 1 &&
    defense <= 10
  );
};

const validateHealth = ({ health }) => {
  return (
    typeof health == "number" &&
    Number.isInteger(health) &&
    health >= 1 &&
    health <= 100
  );
};

const validateName = ({ name }) => {
  return typeof name == "string" && name.trim().length > 0;
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
