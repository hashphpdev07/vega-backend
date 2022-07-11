const { isEmpty } = require("lodash")
const { ValidationException } = require("../exceptions/validation.exception")
const { ROLES, JWT } = require("../utils/constants.util")
const jwt = require("jsonwebtoken");

exports.authMiddleware = auth => {
    if (isEmpty(auth)) {
        throw new ValidationException({}, 'You are not an authenticated user!')
    }
}

exports.userMiddleware = auth => {
    if (auth.roleId != ROLES.USER) {
        throw new ValidationException({}, 'Please login as a user to access this resource!')
    }
}

exports.adminMiddleware = auth => {
    if (auth.roleId != ROLES.ADMIN) {
        throw new ValidationException({}, 'Please login as an admin to access this resource!')
    }
}

exports.isAuthenticated = (req, res, next) => {

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, JWT.SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();

}