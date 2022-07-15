const { isEmpty } = require("lodash")
const { ValidationException } = require("../exceptions/validation.exception")

exports.shareCompositioRequest = body => {
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
