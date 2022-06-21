(require('dotenv')).config()

module.exports = {
	APP_NAME: process.env.APP_NAME,
	SERVER: {
		ENV: process.env.NODE_ENV,
		PORT: process.env.PORT,
		TZ: process.env.TZ,
		TIMEZONE: process.env.TIMEZONE,
		CURRENT_VERSION: 'v1',
		HOST: process.env.HOST_URL,
	},
	WEB: {
		HOST: process.env.WEB_HOST_URL,
	},
	DB: {
		USERNAME: process.env.DB_USERNAME,
		PASSWORD: process.env.DB_PASSWORD,
		DATABASE: process.env.DB_DATABASE,
		HOST: process.env.DB_HOST,
		DIALECT: process.env.DB_DIALECT,
		LOGGING: process.env.DB_LOGGING,
		PORT: process.env.DB_PORT
	},
	JWT: {
		SECRET: process.env.JWT_SECRET,
		EXPIRES_IN: '1y'
	},
	ROLES: {
		ADMIN: 1,
		USER: 2
	},
	GRAPHQL: {
		ERROR_CODE: {
			BAD_USER_INPUT: 'BAD_USER_INPUT'
		}
	},
	ENVIRONMENTS: {
		DEVELOPMENT: 'development',
		PRODUCTION: 'production',
		LINK: process.env.FRONTEND_LINK
	},
	EMAIL: {
		USER: process.env.EMAIL_USER,
		PASSWORD: process.env.EMAIL_PASSWORD,
		HOST: process.env.EMAIL_HOST,
		PORT: process.env.EMAIL_PORT,
		SECURE: Number(process.env.EMAIL_SECURE),
		ACCOUNT_DYNAMIC: Number(process.env.EMAIL_ACCOUNT_DYNAMIC),
		SEND_EMAIL_ON_ORIGINAL: Number(process.env.SEND_EMAIL_ON_ORIGINAL),
		SEND_EMAIL_ON: process.env.SEND_EMAIL_ON
	},
	ASSETS: {
		LOGO_ICON: 'images/logo-icon.png',
		LOGO_FULL: 'images/logo-full.png',
		FAVICON: 'images/favicon.png',
	}
}