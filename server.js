var access_level = 'trial';
var version = '2';
var language_code = 'en';
var APIyear, APImonth, APIday;
var format = 'json';
var api_key = 'uy8g8s654f6pyntetx3yzkt9';

var apiUrl = `https://api.sportradar.com/badminton/${access_level}/v${version}/${language_code}/schedules/${APIyear}-${APImonth}-${APIday}/summaries.${format}?api_key=${api_key}`;


var port = 443;
var usersOnClient = 0;
var tData = null; //tournament data
var allEventsPerDay;
var https = require('https');
const fs = require('fs');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.mybwfscores.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.mybwfscores.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.mybwfscores.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

var express = require("express");
const cors = require('cors');
var bodyParser = require('body-parser')
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options('*', cors());
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});




function getDateTime() {
  //var datetime = new Date().toLocaleString();
  var m = new Date();
  var year = m.getUTCFullYear();
  var month = ("0" + (m.getUTCMonth()+1)).slice(-2);
  var date = ("0" + m.getUTCDate()).slice(-2);
  var hour = ("0" + m.getUTCHours()).slice(-2);
  var min = ("0" + m.getUTCMinutes()).slice(-2);
  var sec = ("0" + m.getUTCSeconds()).slice(-2); 
  var dateString =
    m.getUTCFullYear() + "/" +
    month + "/" +
    date + " " +
    hour + ":" +
    min + ":" +
    sec;
  var dateTimeJson = {
    month : month,
    date : date,
    year : year

  }
  APIday = dateTimeJson.date;
  APImonth = dateTimeJson.month;
  APIyear = dateTimeJson.year;
  apiURL = `https://api.sportradar.com/badminton/${access_level}/v${version}/${language_code}/schedules/${APIyear}-${APImonth}-${APIday}/summaries.${format}?api_key=${api_key}`;
  //return dateTimeJson;
  return dateString;
}


app.get("/enter", (req, res, next) => {
  
    //res.jsonp(["Tony", "Lisa"]);
    //res.json(["Tony", "Lisa"]);
  usersOnClient +=1;
  console.log(usersOnClient);
  if (tData != null) {
      res.send(tData);
      console.log("SENT DATA BACK");
  }
});

app.post("/leave", (req,res,next) => {
  res.json(["OK","LEFT"]);
  console.log("LEFT");
  usersOnClient -= 1;
  console.log(usersOnClient);
})

//call badminton api



app.post("/scores", (req, res, next) => {
  // console.log("JSON BODY");
  // console.log(req.body);
  // console.log(req.body.APIyear);
  // console.log(typeof req.body.APIyear);
  APIyear = req.body.APIyear;
  APImonth = req.body.APImonth;
  APIday = req.body.APIday;
  apiUrl = `https://api.sportradar.com/badminton/${access_level}/v${version}/${language_code}/schedules/${APIyear}-${APImonth}-${APIday}/summaries.${format}?api_key=${api_key}`;
  console.log(apiUrl);
  //console.log(res);
  // var thing = [];
  // thing.push("HI");
  // thing.push("STUPID");
  // res.send(thing);
  https.get(apiUrl, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      
      allEventsPerDay = JSON.parse(data);
      var tours = allEventsPerDay.summaries;
      res.send(tours);
      tData = tours;
      //console.log(allEventsPerDay.results);
      for (var tour in tours) {
          //console.log(tours[tour]);
          //console.log(tours[tour].sport_event.competitors);
          //console.log(tours[tour].sport_event_status.period_scores);
          //console.log('-----------------------------------------');
      }
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
})


// GET API INFO EVERY THIRTY MIN
// var thirtyMin //= 30*60*1000;
// thirtyMin = 60000
// setInterval(function() {
//   getDateTime(),
//   getScores()}, thirtyMin);


// function printTime() {
//   console.log(getDateTime());
//   console.log(typeof thirtyMin);
// }

function getScores() {
  console.log("Getting scores...");
  //console.log(apiUrl);
  https.get(apiUrl, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      
      allEventsPerDay = JSON.parse(data);
      var tours = allEventsPerDay.summaries;
      tData = tours;
      //res.send(tours);
      
      // tData = tours;
      // //console.log(allEventsPerDay.results);
      // for (var tour in tours) {
      //     console.log(tours[tour]);
      //     //console.log(tours[tour].sport_event.competitors);
      //     //console.log(tours[tour].sport_event_status.period_scores);
      //     //console.log('-----------------------------------------');
      // }
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}