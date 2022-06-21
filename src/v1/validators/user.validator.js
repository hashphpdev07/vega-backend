const { isEmpty } = require("lodash")
const { ValidationException } = require("../exceptions/validation.exception")

exports.registerRequest = body => {
    const validator = {}
    const fields = ['fullName', 'email', 'password']
    fields.forEach(field => {
        if (!body[field]) {
            validator[field] = `Please enter ${field}`
        }
    })

    if (!isEmpty(validator)) {
        throw new ValidationException(validator)
    }
}

exports.loginRequest = body => {
    const validator = {}
    const fields = ['email', 'password']
    fields.forEach(field => {
        if (!body[field]) {
            validator[field] = `Please enter ${field}`
        }
    })

    if (!isEmpty(validator)) {
        throw new ValidationException(validator)
    }
}

exports.forgotPasswordRequest = body => {
    const validator = {}
    const fields = ['email']
    fields.forEach(field => {
        if (!body[field]) {
            validator[field] = `Please enter ${field}`
        }
    })

    if (!isEmpty(validator)) {
        throw new ValidationException(validator)
    }
}

exports.resetPasswordRequest = body => {
    const validator = {}
    const fields = ['email', 'password', 'resetPasswordToken']
    fields.forEach(field => {
        if (!body[field]) {
            validator[field] = `Please enter ${field}`
        }
    })

    if (!isEmpty(validator)) {
        throw new ValidationException(validator)
    }
}

exports.profileRequest = body => {
    const validator = {}
    const fields = ['fullName', 'email', 'password']
    fields.forEach(field => {
        if (!body[field]) {
            validator[field] = `Please enter ${field}`
        }
    })

    if (!isEmpty(validator)) {
        throw new ValidationException(validator)
    }
}