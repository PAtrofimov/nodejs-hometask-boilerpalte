const {HTTP_STATUS_ERROR_QUERY, HTTP_STATUS_ERROR_UNKNOWN} = require("../constants/index");
const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.data) {
    return res.status("200").json(res.data);
  }

  if (res.err) {
    const { message, httpStatus = HTTP_STATUS_ERROR_QUERY } = res.err;
    return res.status(httpStatus).json({ error: true, message });
  }

  if (!res.headersSent) {
    res.status(HTTP_STATUS_ERROR_UNKNOWN).render("UnknownError");
  }

  next();
};

exports.responseMiddleware = responseMiddleware;
