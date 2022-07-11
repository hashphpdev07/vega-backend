'use strict';
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const { isAuthenticated } = require('../middlewares/user.middleware')
const { Users, UserLogin } = require('../models').default

router.get('/', function(req, res, next) {
    res.render('login');
})
router.post('/', async function(req, res, next) {
    const { email, password } = req.body
			const user = await Users.findOne({ "email": email })
			if (!user) {
				res.send("<h1>User is not exist</h1>")
			}
			const isValid = await bcrypt.compare(password, user.password)

			if (!isValid) {
				res.send("<h1>Password is wrong</h1>")
			}
			const token = generateToken(user)
			//const roleData = await Role.findOne( { '_id': user.roleId } )
			UserLogin.create({ userId: mongoose.Types.ObjectId(user.id), jwtToken: token })

			return { token, user: { id: user.id, ...pick(user, ['FirstName', 'LastName', 'email']) } }

    res.render('login');
})
module.exports = router;