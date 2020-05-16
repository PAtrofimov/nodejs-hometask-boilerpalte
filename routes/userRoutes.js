const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");
const { HTTP_STATUS_ERROR_NOT_FOUND } = require("../constants/index");

const router = Router();

// TODO: Implement route controllers for user
// USER:
// GET /api/users
// GET /api/users/:id
// POST /api/users
// PUT /api/users/:id
// DELETE /api/users/:id

router.get(
  "/",
  function (req, res, next) {
    try {
      res.data = UserService.getAll();
    } catch (err) {
      err.httpStatus = HTTP_STATUS_ERROR_NOT_FOUND;
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  function (req, res, next) {
    const { id } = req.params;
    try {
      res.data = UserService.get(id);
    } catch (err) {
      err.httpStatus = HTTP_STATUS_ERROR_NOT_FOUND;
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  function (req, res, next) {
    if (res.err) {
      next();
      return;
    }

    try {
      res.data = UserService.create(req.body);
    } catch (err) {
      err.httpStatus = HTTP_STATUS_ERROR_NOT_FOUND;
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  function (req, res, next) {
    if (res.err) {
      next();
      return;
    }
    const { id } = req.params;

    try {
      res.data = UserService.update(id, req.body);
    } catch (err) {
      err.httpStatus = HTTP_STATUS_ERROR_NOT_FOUND;
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  function (req, res, next) {
    const { id } = req.params;

    try {
      res.data = UserService.delete(id);
    } catch (err) {
      err.httpStatus = HTTP_STATUS_ERROR_NOT_FOUND;
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
