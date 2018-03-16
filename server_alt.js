// the serving/streaming side of our modfified chatroom/DIY streaming service,
// accessing the chatroom via getusermedia on index_alt.html, serving/streaming on index.html to audience  

var https = require('https');
var fs = require('fs');
var url =  require('url');

//change this to your own keys/certs for https (needed for getusermedia)
var options = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

//setup path (on index_alt.html) for physical interface (camera/smiley-face/servo in real location) streaming camera feed on index.html

function handleIt(req, res) {
        var parsedUrl = url.parse(req.url);

        var path = parsedUrl.pathname;
        if (path == "/") {
                path = "index_alt.html";
        }

        fs.readFile(__dirname + path,

                // Callback function for reading
                function (err, fileContents) {
                        // if there is an error
                        if (err) {
                                res.writeHead(500);
                                return res.end('Error loading ' + req.url);
                        }
                        // Otherwise, send the data, the contents of the file
                        res.writeHead(200);
                        res.end(fileContents);
                }
        );

        // Send a log message to the console
        console.log("Got a request " + req.url);
}

var httpServer = https.createServer(options, handleIt);
httpServer.listen(12344);
