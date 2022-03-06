var access_level = 'trial';
var version = '2';
var language_code = 'en';
var APIyear, APImonth, APIday;
var format = 'json';
var api_key = 'gjkugkmygmrw4u794jq8dwvv';

var apiUrl = `https://api.sportradar.com/badminton/${access_level}/v${version}/${language_code}/schedules/${APIyear}-${APImonth}-${APIday}/summaries.${format}?api_key=${api_key}`;
var mongoURL = 'mongodb+srv://Kinsey_123Admin:KX66981833$@cluster0.1zg8c.mongodb.net/test';

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

global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
var util= require('util');
const utf8Encoder = new util.TextEncoder();
const utf8Decoder = new util.TextDecoder("utf-8", { ignoreBOM: true });
const { MongoClient } = require("mongodb");
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
	console.log('HTTPS Server running on port ' + port);
});




// function getDateTime() {
//   //var datetime = new Date().toLocaleString();
//   var m = new Date();
//   var year = m.getUTCFullYear();
//   var month = ("0" + (m.getUTCMonth()+1)).slice(-2);
//   var date = ("0" + m.getUTCDate()).slice(-2);
//   var hour = ("0" + m.getUTCHours()).slice(-2);
//   var min = ("0" + m.getUTCMinutes()).slice(-2);
//   var sec = ("0" + m.getUTCSeconds()).slice(-2); 
//   var dateString =
//     m.getUTCFullYear() + "/" +
//     month + "/" +
//     date + " " +
//     hour + ":" +
//     min + ":" +
//     sec;
//   var dateTimeJson = {
//     month : month,
//     date : date,
//     year : year

//   }
//   APIday = dateTimeJson.date;
//   APImonth = dateTimeJson.month;
//   APIyear = dateTimeJson.year;
//   apiURL = `https://api.sportradar.com/badminton/${access_level}/v${version}/${language_code}/schedules/${APIyear}-${APImonth}-${APIday}/summaries.${format}?api_key=${api_key}`;
//   //return dateTimeJson;
//   return dateString;
// }


// app.get("/enter", (req, res, next) => {
  
//     //res.jsonp(["Tony", "Lisa"]);
//     //res.json(["Tony", "Lisa"]);
//   usersOnClient +=1;
//   console.log(usersOnClient);
//   if (tData != null) {
//       res.send(tData);
//       console.log("SENT DATA BACK");
//   }
// });

// app.post("/leave", (req,res,next) => {
//   res.json(["OK","LEFT"]);
//   console.log("LEFT");
//   usersOnClient -= 1;
//   console.log(usersOnClient);
// })

// //call badminton api



// app.post("/scores", (req, res, next) => {
//   // console.log("JSON BODY");
//   // console.log(req.body);
//   // console.log(req.body.APIyear);
//   // console.log(typeof req.body.APIyear);
//   APIyear = req.body.APIyear;
//   APImonth = req.body.APImonth;
//   APIday = req.body.APIday;
//   apiUrl = `https://api.sportradar.com/badminton/${access_level}/v${version}/${language_code}/schedules/${APIyear}-${APImonth}-${APIday}/summaries.${format}?api_key=${api_key}`;
//   console.log(apiUrl);
//   //console.log(res);
//   // var thing = [];
//   // thing.push("HI");
//   // thing.push("STUPID");
//   // res.send(thing);
//   https.get(apiUrl, (resp) => {
//     let data = '';

//     // A chunk of data has been received.
//     resp.on('data', (chunk) => {
//       data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
      
//       allEventsPerDay = JSON.parse(data);
//       var tours = allEventsPerDay.summaries;
//       res.send(tours);
//       tData = tours;
//       //console.log(allEventsPerDay.results);
//       for (var tour in tours) {
//           //console.log(tours[tour]);
//           //console.log(tours[tour].sport_event.competitors);
//           //console.log(tours[tour].sport_event_status.period_scores);
//           //console.log('-----------------------------------------');
//       }
//     });

//   }).on("error", (err) => {
//     console.log("Error: " + err.message);
//   });
// })


// // GET API INFO EVERY THIRTY MIN
// // var thirtyMin //= 30*60*1000;
// // thirtyMin = 60000
// // setInterval(function() {
// //   getDateTime(),
// //   getScores()}, thirtyMin);


// // function printTime() {
// //   console.log(getDateTime());
// //   console.log(typeof thirtyMin);
// // }

// function getScores() {
//   console.log("Getting scores...");
//   //console.log(apiUrl);
//   https.get(apiUrl, (resp) => {
//     let data = '';

//     // A chunk of data has been received.
//     resp.on('data', (chunk) => {
//       data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
      
//       allEventsPerDay = JSON.parse(data);
//       var tours = allEventsPerDay.summaries;
//       tData = tours;
//       //res.send(tours);
      
//       // tData = tours;
//       // //console.log(allEventsPerDay.results);
//       // for (var tour in tours) {
//       //     console.log(tours[tour]);
//       //     //console.log(tours[tour].sport_event.competitors);
//       //     //console.log(tours[tour].sport_event_status.period_scores);
//       //     //console.log('-----------------------------------------');
//       // }
//     });

//   }).on("error", (err) => {
//     console.log("Error: " + err.message);
//   });
// }

var db;

MongoClient.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
      return console.log(err);
  }

  // Specify database you want to access
  db = client.db('badminton_scores');

  console.log(`MongoDB Connected: ${mongoURL}`);
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
  apiUrl = `https://api.sportradar.com/badminton-t1/en/schedules/${APIyear}-${APImonth}-${APIday}/results.json?api_key=${api_key}`;
  //return dateTimeJson;
  return dateString;
}


app.get("/enter", (req, res, next) => {
  usersOnClient +=1;
  console.log(usersOnClient);
  getDateTime();
  getScores();
  
  setTimeout(()=>{
    console.log(tData);
    res.send(tData);
    console.log("inside timeout");
},3000);
  
  //console.log(tData);
  console.log("SENT DATA BACK");

});

app.post("/leave", (req,res,next) => {
  res.json(["OK","LEFT"]);
  console.log("LEFT");
  usersOnClient -= 1;
  console.log(usersOnClient);
})

//call badminton api



app.post("/scores", (req, res, next) => {
  APIyear = req.body.APIyear;
  APImonth = req.body.APImonth;
  APIday = req.body.APIday;
  // APIyear = 2021;
  // APImonth = 12;
  // APIday = 15;
  //apiUrl = `http://api.sportradar.com/badminton/${access_level}/v${version}/${language_code}/schedules/${APIyear}-${APImonth}-${APIday}/summaries.${format}?api_key=${api_key}`;
  apiUrl = `https://api.sportradar.com/badminton-t1/en/schedules/${APIyear}-${APImonth}-${APIday}/results.json?api_key=${api_key}`;
  
  var dateMonth = APIyear + '-' + APImonth + '-' + APIday;
  let promise = db.collection('dates').find({date: dateMonth}).toArray();

  promise.then((matchFound => {
    console.log(matchFound.length);
    if(matchFound.length != 0) {
      //console.log(allEventsPerDay.length);
      console.log("Fetched from DB");
      //if(matchFound.count > 0) {
      let matchesPromise = db.collection('matches').find({date: dateMonth}).toArray();
      matchesPromise.then((allEventsPerDay => {
        res.send({results : allEventsPerDay});
      }))
     
    }
    else {
      console.log("Fetching from SportsRadar");
      https.get(apiUrl, (resp) => {
        let data = '';
        console.log(apiUrl);
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
  
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          
          allEventsPerDay = JSON.parse(data);
          res.send(allEventsPerDay);
          var match;
          db.collection('dates').updateOne({_id: dateMonth}, {$set:{date: dateMonth, count: allEventsPerDay.results.length}}, {upsert:true});
          for (var tour in allEventsPerDay.results) {
            match = allEventsPerDay.results[tour];
            var id = match.sport_event.id.substr(match.sport_event.id.indexOf('match:')+6, match.sport_event.id.length);
            var tourName = match.sport_event.tournament.id.substr(match.sport_event.tournament.id.indexOf('tournament:')+11,match.sport_event.tournament.id.length);
            db.collection('matches').updateOne({_id: id} , {$set: { matchDetails: match, tournament: tourName, date: dateMonth}}, {upsert: true});
  
          }
          });
          
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    }
  }))

   
  
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
  console.log(apiUrl);
  https.get(apiUrl, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      allEventsPerDay = JSON.parse(data);
      var tours = allEventsPerDay.results;
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
