(require('dotenv')).config()

module.exports = {
	EMAILTITLE:{
		Reset: "Click on the link below to reset your password and get access to your account.",
		Registration: "Hi there! Thank you for trying out Storio, it’s lovely to see you.",
		RegistrationDes: "We’re looking forward to seeing amazing stories that you’ll share on our platform."
	},
	SUCCESSMSG: {
		Logout: "Logged out!",
		UpdateProfile: "Profile Photo Updated Sucessfully!",
		MailSent: ", we just sent you an email. Please check your inbox."
	},
	VALIDATOR:{
		//User Module
		EmailTaken: 'Email has already been taken!',
		UsernotExsit: 'No user with that email!',
		InccortPassword: 'Incorrect password!',
		InccortToken: 'Incorrect Token!',
		SessionEx: 'Your Session Expried!',

		//Post Module
		TitleTaken: 'Title has already been taken!',
		DeletePost: 'Post Deleted Successfullt!',
		UpdateStory: 'View Story',

		//search Module
		UserTaken: "Already Follow this User.",
		UserNotTaken: "You are not Follow this User."
	}
	
}