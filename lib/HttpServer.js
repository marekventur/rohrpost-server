module.exports = function(config, supervisor, logger) {
	var that = this;

	var express = require('express');
	var http = require('http');
	var https = require('https');
	var httpOrHttpsServer = null;

	var terminating = false;

	that.start = function() {
		app = express();
		app.use(express.static(config.http.static));

		app.get('/', function(req, res) {
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			var port = supervisor.getRandomAvailablePort();
			if (port) {
				res.json({ 
					protocol: config.http.https?'https':'http',
					host: config.http.host,
					port: port
				});
			} else {
				res.send('No connection available', 404);
			}
		});		

		if (config.http.https) {
			httpOrHttpsServer = https.createServer(config.http.httpsOptions, app).listen(config.http.mainPort, config.http.host);
			logger.info("Main HTTPS server is listening on %s:%s", config.http.host, config.http.mainPort);
		} else {
			httpOrHttpsServer = http.createServer(app).listen(config.http.mainPort, config.http.host);
			logger.info("Main HTTP server is listening on %s:%s", config.http.host, config.http.mainPort);
		}		
	};

	that.stop = function() {
		if (httpOrHttpsServer) {
			httpOrHttpsServer.close();
		}
	}
}