based on the simpleWebRTC examples on https://github.com/andyet/SimpleWebRTC

var https = require('https');
var fs = require('fs');
var url =  require('url');

//change the https keys/cert to your own
var options = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

//setup path for physical interface (camera/smiley-face/servo in real location) streaming camera feed on index.html
function handleIt(req, res) {
        var parsedUrl = url.parse(req.url);

        var path = parsedUrl.pathname;
        if (path == "/") {
                path = "index.html";
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
