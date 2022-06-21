const { existsSync } = require("fs");
const { sign } = require("jsonwebtoken");
const { isEmpty, pick } = require("lodash");
const { JWT, SERVER } = require("./constants.util");

exports.GraphQLErrorHandler = error => {
	if (error.extensions.exception.errorFields && !isEmpty(error.extensions.exception.errorFields)) {
		return { fields: error.extensions.exception.errorFields }
	}
	return { message: error.message }
}

exports.GraphQLResponseHandler = response => {
	return response
}

exports.generateToken = user => sign({ id: user._id, ...pick(user, ['email', 'fullName']) }, JWT.SECRET, { expiresIn: JWT.EXPIRES_IN })

exports.assets = filePath => {
	const oldProfile = process.cwd() + `/public/uploads/${filePath}`;
	if (existsSync(oldProfile)) {
		return `${SERVER.HOST}/uploads/${filePath}`
	}
	return '';
}