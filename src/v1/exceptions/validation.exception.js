class ValidationException extends Error {
    constructor(errorFields, message = 'Validation errors.') {
        super(message)

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);

        this.errorFields = errorFields
    }
}

module.exports = { ValidationException }  