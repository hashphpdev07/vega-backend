const bcrypt = require('bcrypt')
const { ROLES, ENVIRONMENTS } = require('../../utils/constants.util')
const { SUCCESSMSG, VALIDATOR, EMAILTITLE } = require('../../utils/errormsg.util')
const { ValidationException } = require('../../exceptions/validation.exception')
const { isEmpty, pick, random } = require('lodash')
const { shareCompositioRequest } = require('../../validators/project.validator')
const { authMiddleware, userMiddleware } = require('../../middlewares/user.middleware')
const { Users, UserLogin, UserCompositions } = require('../../models').default
const { generateToken } = require('../../utils/helpers.util')
//const { sendEmailUsingTemplate, sendEmailUsingTemplateRegistration } = require('../../utils/email.util')
const mongoose = require('mongoose')
const {
	UserInputError
} = require('apollo-server-express');


module.exports = {
	
	Mutation: {
		// User register
		

		async shareComposition(_, body, { auth }){

			userMiddleware(auth)
			shareCompositioRequest(body)
			const { Id, email } = body
			const validator = {}
			let userId = ""
			let shareIds = []

			// Check if email is new or exists
			const userExists = await Users.findOne({ name })

			if (!userExists) {
				const user = await Users.create({
					email,
					password: await bcrypt.hash("admin@111", 10),
					roleId: ROLES.USER,
				})
				userId = user._id
			}
			else{
				userId = userExists._id
			}
			const compostionExists = await UserCompositions.findOne({ "_id": Id })
			if (compostionExists.SharedUserId) {
				shareIds = compostionExists.SharedUserId
			}

			shareIds.push(userId)
			
			await UserCompositions.updateOne({ "_id": Id }, { SharedUserId: shareIds })

			return { message: "Successfully Shared." }

		}

	},
}
