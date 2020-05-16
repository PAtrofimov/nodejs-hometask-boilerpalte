const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");
const { HTTP_STATUS_ERROR_NOT_FOUND } = require("../constants/index");

const router = Router();

// TODO: Implement route controllers for fighter
// FIGHTER
//         GET /api/fighters
//         GET /api/fighters/:id
//         POST /api/fighters
//         PUT /api/fighters/:id
//         DELETE /api/fighters/:id

router.get(
  "/",
  function (req, res, next) {
    try {
      res.data = FighterService.getAll();
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
      res.data = FighterService.get(id);
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
  createFighterValid,
  function (req, res, next) {
    if (res.err) {
      next();
      return;
    }

    try {
      res.data = FighterService.create(req.body);
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
  updateFighterValid,
  function (req, res, next) {
    if (res.err) {
      next();
      return;
    }
    const { id } = req.params;

    try {
      res.data = FighterService.update(id, req.body);
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
      res.data = FighterService.delete(id);
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
