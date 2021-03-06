module.exports = {
	/* This is the list of redis topics every client will be allowed to receive after connection */
	"defaultWhitelist": [
		"user.req.login"
	],

	/* http server config */
	"http": {
		/* You should only use this for development. Set to false in production and host files somewhere else */
		"static": __dirname + "/static",

		/* Enable https support. */
		"https": true,

		/* Make sure to create your own set of keys! Options can be ignored for simple http */
		"httpsOptions": {
			"key": require('fs').readFileSync(__dirname + "/keys/key.pem"),
  			"cert": require('fs').readFileSync(__dirname + "/keys/cert.pem")
		},

		/* This is the host used for both the main process as well as the workers */
		"host": "127.0.0.1",
		
		/* This is the main port that serves the connection information (and static http in dev environments) */
		"mainPort": 3000,

		/* For each those ports there will be one instance spawned accepting websocket connections. Make
		   sure all of those ports are publicly reachable on the host defined above */
		"workerPorts": [3001, 3002, 3003, 3004]
	},

	/* You can use different redis instances for storage and pubsub, but it's not a requirement */
	"redis":{
		"connectionData": {
			"host": "127.0.0.1",
			"port": 6379
		},
		"pubsub": {
			"host": "127.0.0.1",
			"port": 6379
		}
	},
}