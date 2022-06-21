const { createTestAccount, createTransport, getTestMessageUrl } = require("nodemailer");
const { APP_NAME, EMAIL, ASSETS, WEB, SERVER } = require("./constants.util");
const { assets } = require("./helpers.util");
const { parse } = require("./parseTemplate.util");

exports.send = ({ to, subject, html, attachments }) => {
	return new Promise(async (resolve, reject) => {
		try {
			let transporter;
			if ([1, 'true', true].includes(EMAIL.ACCOUNT_DYNAMIC)) {
				const account = await createTestAccount();
				console.log('test SMTP account', account);
				transporter = createTransport({
					host: account.smtp.host,
					port: account.smtp.port,
					secure: account.smtp.secure,
					auth: {
						user: account.user,
						pass: account.pass
					}
				});
			} else {
				transporter = createTransport({
					host: EMAIL.HOST,
					port: EMAIL.PORT,
					secure: Boolean(EMAIL.SECURE), // true for 465, false for other ports like 587
					auth: {
						user: EMAIL.USER,
						pass: EMAIL.PASSWORD,
					},
					tls: {
						rejectUnauthorized: false
					},
					pool: true
				});
			}


			let mailOptions = {
				from: APP_NAME + " Team" + ' <' + EMAIL.USER + '>', // sender address
				to,  // list of receivers
				subject, //'Hello ✔', // Subject line
				// text: 'Hello world?', // plain text body
				html // html body
			};

			if (attachments) {
				mailOptions.attachments = attachments;
			}

			transporter.verify((error, success) => {
				if (error) {
					reject(error);
				} else {
					// send mail with defined transport object
					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							reject(error);
						} else {
							console.log('Preview URL: %s', getTestMessageUrl(info));
							resolve(info);
						}
					});
				}
			});
		} catch (error) {
			reject(error);
		}
	});
};


exports.sendEmailOn = (email, force = false) => {
	if (force) {
		console.log(`Email will be sent forcefully on`, { email });
		return email;
	}
	email = EMAIL.SEND_EMAIL_ON_ORIGINAL ? email : EMAIL.SEND_EMAIL_ON;
	console.log(`Email will be sent on`, { email });
	return email;
}

exports.sendEmailUsingTemplateRegistration = async (mailData) => {
	try {
		mailData.logo = assets(ASSETS.LOGO_FULL);
		mailData.appName = `${APP_NAME}`;
		mailData.website = `${WEB.HOST}`;
		mailData.TIMEZONE = `${SERVER.TIMEZONE}`;
		mailData.TZ = `${SERVER.TZ}`;
		const data = {
			to: this.sendEmailOn(mailData.email),
			subject: mailData.subject,
			attachments: mailData.data.attachments
		};
		const master = await parse(mailData.masterTemplate || "templates/email/registrationMail", mailData);
		const content = await parse(mailData.bodyTemplate, mailData);
		data.html = master.replace('[[content]]', content);
		const isSent = await this.send(data);
		console.log(`isSent:sendUsingTemplate : ${mailData.bodyTemplate}`, isSent);
		return isSent;
	} catch (error) {
		console.log(`Email:sendUsingTemplate : ${mailData.bodyTemplate} error`, error);
		return false;
	}
}

exports.sendEmailUsingTemplate = async (mailData) => {
	try {
		mailData.logo = assets(ASSETS.LOGO_FULL);
		mailData.appName = `${APP_NAME}`;
		mailData.website = `${WEB.HOST}`;
		mailData.TIMEZONE = `${SERVER.TIMEZONE}`;
		mailData.TZ = `${SERVER.TZ}`;
		const data = {
			to: this.sendEmailOn(mailData.email),
			subject: mailData.subject,
			attachments: mailData.data.attachments
		};
		const master = await parse(mailData.masterTemplate || "templates/email/master", mailData);
		const content = await parse(mailData.bodyTemplate, mailData);
		data.html = master.replace('[[content]]', content);
		const isSent = await this.send(data);
		console.log(`isSent:sendUsingTemplate : ${mailData.bodyTemplate}`, isSent);
		return isSent;
	} catch (error) {
		console.log(`Email:sendUsingTemplate : ${mailData.bodyTemplate} error`, error);
		return false;
	}
}