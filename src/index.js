const { SERVER, APP_NAME, JWT } = require('./v1/utils/constants.util')
require(`./${SERVER.CURRENT_VERSION}/utils/extensions.util`)
require(`colors`)
const { ApolloServer } = require(`apollo-server-express`)
const express = require(`express`)
const { createServer } = require(`http`)
const { join } = require(`path`)
const { GraphQLResponseHandler, GraphQLErrorHandler } = require('./v1/utils/helpers.util')
const jsonwebtoken = require('jsonwebtoken')
const { User, UserLogin } = require('./v1/models').default
const {schema  } = require(`./${SERVER.CURRENT_VERSION}/graphql`)
const socketIO = require('socket.io');
const { Server } = require("socket.io");

//const { adminRouteOptions, adminRoutes } = require(`./${SERVER.CURRENT_VERSION}/routes/admin.route`)
const app = express()
const mongoose = require('mongoose')

// parse only json data
app.use(express.json())
// console.log(typeDefs)
// allow public directory to be accessible publically as we put logo, favicon etc

// serve static files
app.use(express.static('public'))

// Server instance
const server = createServer(app)

//const io = new Server(server)

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Socket

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/index.html');
//   });

// io.on('connection', (socket) => {
// 	console.log("Hello")
// 	socket.on('chat message', (msg) => {
// 	  console.log('message: ' + msg);
// 	  io.emit('chat message', msg);
// 	});
//   });

// Start the server
server.listen(SERVER.PORT, async _ => {
	const srv = new ApolloServer({
	schema,
		// introspection: The default value is true, unless the NODE_ENV environment variable is set to production.
		// graphqlPath:`/api/${SERVER.CURRENT_VERSION}/gql`,
		formatError: GraphQLErrorHandler,
		formatResponse: GraphQLResponseHandler,
		context: async ({ req }) => {
			let contextData = {}
			
			const token = ((req.headers.authorization || '').replace('Bearer ', '')).trim();
			//console.log(token)
			if (token) {
				try {
					var user = jsonwebtoken.verify(token, JWT.SECRET)
					if (user && user.id) {
						user = await User.findOne({ '_id': user.id })
						
						var login = await UserLogin.findOne({  jwtToken: token })
						
						if (user && login && !login.logoutAt) {
							user.login = login
							contextData.auth = user
						}
					}
				} catch (error) {
					console.log('jsonwebtoken error', error.message);
				}
			}
			return contextData;
		}
	});
	await srv.start();

	srv.applyMiddleware({
		app, // express app instance
		path: `/api/${SERVER.CURRENT_VERSION}` // API endpoint for client application
	});

	console.log(`🚀 ${APP_NAME.bgRed} ${'Express'.bgGreen} server started at ${SERVER.HOST.yellow}`)
	console.log(`🚀 ${APP_NAME.bgRed} ${'GraphQL'.bgCyan} server started at ${SERVER.HOST.blue}${srv.graphqlPath.blue}`)
})