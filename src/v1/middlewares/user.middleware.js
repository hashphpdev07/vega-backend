const { isEmpty } = require("lodash")
const { ValidationException } = require("../exceptions/validation.exception")
const { ROLES } = require("../utils/constants.util")

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
