const bcrypt = require('bcrypt')
const { ROLES, ENVIRONMENTS } = require('../../utils/constants.util')
const { SUCCESSMSG, VALIDATOR, EMAILTITLE } = require('../../utils/errormsg.util')
const { ValidationException } = require('../../exceptions/validation.exception')
const { isEmpty, pick, random } = require('lodash')
const { registerRequest, loginRequest } = require('../../validators/user.validator')
const { authMiddleware, userMiddleware } = require('../../middlewares/user.middleware')
const { Users, UserLogin, Role, ActivityLog } = require('../../models').default
const { generateToken } = require('../../utils/helpers.util')
const { sendEmailUsingTemplate, sendEmailUsingTemplateRegistration } = require('../../utils/email.util')
const mongoose = require('mongoose')
const {
	UserInputError
} = require('apollo-server-express');


module.exports = {
	Query: {
		// get user profile detail
		async profile(_, { }, { auth }) {
			authMiddleware(auth)
			userMiddleware(auth)

			return { ...pick(auth, ['fullName', 'email', 'photo']) }

		},

		// Logout user
		async logout(_, { }, { auth }) {
			authMiddleware(auth)
			userMiddleware(auth)
			await UserLogin.updateOne({ "_id": auth.login.id }, { logoutAt: new Date() })
			return { message: SUCCESSMSG.Logout }
		},

		//get all followerlist

	},
	Mutation: {
		// User register
		async register(_, body) {
			registerRequest(body)
			const { FirstName, LastName, email, password, ProfilePic } = body
			const validator = {}

			// Check if email is new or exists
			const emailExists = await Users.findOne({ 'email': email })

			if (emailExists) {
				validator.email = VALIDATOR.EmailTaken
			}

			if (!isEmpty(validator)) {
				throw new ValidationException(validator)
			}
			//const roleData = await Role.findOne( { 'name': "user" } )
			const user = await Users.create({
				FirstName,
				LastName,
				email,
				password: await bcrypt.hash(password, 10),
				roleId: ROLES.USER,
				ProfilePic
			})

			const token = generateToken(user)
			const link = ENVIRONMENTS.LINK

			sendEmailUsingTemplateRegistration({
				bodyTemplate: "templates/email/send-verification-code",
				subject: "Welcome to Storio!",
				name: `${user.fullName}`,
				email: user.email,
				lang: 'en',
				data: {
					title1: EMAILTITLE.Registration,
					title2: EMAILTITLE.RegistrationDes,
					link,
				},
			})

			//ActivityLog.create({ userId: mongoose.Types.ObjectId(user._id), eventType: "New User " + user.fullName + " register in our system." })

			await UserLogin.create({ userId: mongoose.Types.ObjectId(user.id), jwtToken: token })
			return { token, user: { id: user.id, ...pick(user, ['FirstName', 'LastName', 'email', 'ProfilePic']) } }
		},

		// User login
		async login(_, body) {
			loginRequest(body)
			const { email, password } = body
			const user = await Users.findOne({ "email": email })
			if (!user) {
				throw new ValidationException({ email: VALIDATOR.UsernotExsit })
			}
			const isValid = await bcrypt.compare(password, user.password)

			if (!isValid) {
				throw new ValidationException({ password: VALIDATOR.InccortPassword })
			}
			const token = generateToken(user)
			//const roleData = await Role.findOne( { '_id': user.roleId } )
			UserLogin.create({ userId: mongoose.Types.ObjectId(user.id), jwtToken: token })

			return { token, user: { id: user.id, ...pick(user, ['FirstName', 'LastName', 'email']) } }

		},

	},
}
