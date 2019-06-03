var TwitterStream = require('twitter-stream-api'),
    fs = require('fs');

const pathToRegexp = require('path-to-regexp');

const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('html'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var keys = {
    consumer_key : "Wl01UD2pOmjnvycuA9iMICtrY",
    consumer_secret : "3EWcCfbXBNtKbjdmg69I2iJNubXBncwpHCak0Qc6eKcUSNJ2YB",
    token : "2799949501-xGaLKkCjCxqz392pd0QBk9TI3omnVzzYu4tJTB8",
    token_secret : "Hu1LmPDXIyBCPBihvRUGXu9TmhVugRQV4pVhso5606ACy"
};

var Twitter = new TwitterStream(keys, false);
Twitter.stream('statuses/filter', {
    track: 'twitterposter'
});

// Twitter.pipe(fs.createWriteStream('tweets.json'));


Twitter.on('data', function (obj) {
	var tweet = obj.toString("utf8");
	 console.log(JSON.stringify(JSON.parse(tweet), null, 2));
    io.emit('tweet', JSON.parse(tweet));
});


io.on('connection', client => {
	console.log("someone is connected");
});

// server.listen(3000, () => {
//   console.log("http://localhost:3000")
// });
