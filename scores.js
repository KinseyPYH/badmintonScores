//header("Access-Control-Allow-Origin: *");
//const datepicker = require('js-datepicker')
//import datepicker from 'js-datepicker'
var access_level = 't';
var version = '1';
version = '2';
var language_code = 'en';
var year, month, day;
var format = 'json';
//var api_key = '5snqwectfqhnkrzc7x93tf5j';


//var apiUrl = 'http://localhost:3000'; 

apiUrl = 'https://www.mybwfscores.com'; //server url
//apiUrl = 'http://18.162.188.240';
var corsHeader = { 'Access-Control-Allow-Origin': apiUrl};
var startTime = null;
//enter window
window.onload = function() {
    var date = getDateTimeString();
    $("#time").html(date + " (Local Times)");
    console.log("Page Loaded");
    //console.log("LOADED IN");
    
    $.ajax({
        type: 'GET',
        //url: 'http://18.162.188.240:3000/enter',
        dataType: 'json',
        headers: corsHeader,
        url: apiUrl + '/enter',
        success: function(data){
            console.log("GET Scores: Success");
            //$(".card #name1").html("HJFJW");
            showData(data);
        },
        error: function() {
            console.log("GET Scores: Fail");
        }
    })
}

//exit window
window.addEventListener('beforeunload', function(e) {
    $.ajax({
        type: 'POST',
        dataType: 'jsonp',
        url: apiUrl + '/leave',
        success: function(data){
            console.log("Page Unload success call");
        }
    })
})




var tData;

//var thirtyMin = 30*60*1000;
//thirtyMin = 60000
//setInterval(callAPI(), thirtyMin);

function getDateTimeString() {
    //var datetime = new Date().toLocaleString();
    var n = new Date();
    var m = new Date(n.getTime() + 4*80*60000);
    var year = m.getUTCFullYear().toString();
    var month = ("0" + (m.getUTCMonth()+1)).slice(-2);
    var date = ("0" + m.getUTCDate()).slice(-2);
    var hour = ("0" + m.getUTCHours()).slice(-2);
    var min = ("0" + m.getUTCMinutes()).slice(-2);
    var sec = ("0" + m.getUTCSeconds()).slice(-2); 
    var dateString =
        m.getUTCFullYear() + "-" +
        month + "-" +
        date;
       
    return dateString;
}

function getDateTime(dateToGet, today) {
//var datetime = new Date().toLocaleString();
    var dateTimeJson;
    if (today) {
        var m = new Date();
        var year = m.getUTCFullYear().toString();
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
        dateTimeJson = {
            APImonth : month,
            APIday : date,
            APIyear : year
        }   
        APIday = dateTimeJson.date;
        APImonth = dateTimeJson.month;
        APIyear = dateTimeJson.year;
    }
    else {
        var m = dateToGet;
        m = dateToGet.split('/');
        var year = m[2];
        var month = m[0];
        var date = m[1];
        dateTimeJson = {
            APImonth : month,
            APIday : date,
            APIyear : year
        }   
    }
    
//apiURL = `https://api.sportradar.com/badminton/${access_level}/v${version}/${language_code}/schedules/${APIyear}-${APImonth}-${APIday}/summaries.${format}?api_key=${api_key}`;
//return dateTimeJson;
    return dateTimeJson;
}



function callAPI(currentDate, today) {

    dateJson = getDateTime(currentDate, today);

    var input = dateJson;
    console.log(input);

    $.ajax({
        type: 'POST',
        data: JSON.stringify(input),
        dataType: 'json',
        contentType: "application/json",
        //crossDomain: true,
        //headers: {'Access-Control-Allow-Origin':'*'},
        //dataType: 'jsonp',
        url: apiUrl + '/scores',
        success: function(data){
            console.log("SUCCESS");
            console.log(data);
            var tours = data;
            tData = data;
            showData(tData); 
        }
    })
}

function showData(tournament) {
    //$('.row').clear();
    console.log(tournament)
    var tours = tournament;
    //tours = tours.results;
    if(tours.results) {
        tours = tours.results
    }
    console.log(tours);
    console.log("CALLED SHOW DATA");
    $('.row').empty();
    if (tours.length == 0 ) {
        document.getElementById("No_Matches").style.display = 'block';
        return;
    }
    else {
        document.getElementById("No_Matches").style.display = 'none';
    }
    console.log(tours);
    for (var tour in tours) {

        try {

        
            var match_details;
            if (tours[tour].matchDetails) {
                match_details = tours[tour].matchDetails;
                console.log(match_details);
            }
            else {
                match_details = tours[tour];
            }
            
            console.log(match_details);
            var full_tournament_name = "";
            var tournament_id;
            var tournament_name = "";
            var category = "";
            var round = "";
            var competitors = "";
            var homeCompObj = "";
            var awayCompObj = "";
            var home_country_code = "";
            var away_country_code = "";
            var scores = "";
            var homeSetScore = "";
            var awaySetScore = "";
            var scoreSet1 = "";
            var homeScore1 = "";
            var awayScore1 = "";
            var scoreSet2 = "";
            var homeScore2 = "";
            var awayScore2 = "";
            var scoreSet3  = "";
            var homeScore3 = "";
            var awayScore3 = "";
            var status = "";
            var homeCompName = "";
            var awayCompName = "";
            var homeCompID = "";
            var awayCompID = "";
            var matchTime = "";
            if (match_details.sport_event.scheduled) {
                matchTime = APITimeToLocal(match_details.sport_event.scheduled);
            }
            // ******************
            var compDetails = match_details.sport_event;
            if (!compDetails.tournament) {
                full_tournament_name = compDetails.competition.name;
                tournament_name = full_tournament_name;
                category = "N/A";
                round = capitalizeFirstLetter(compDetails.round.name);
            }

            else {
                full_tournament_name = compDetails.tournament.name;
                
                if (full_tournament_name.includes(',')) {
                    tournament_name = full_tournament_name.substr(0,full_tournament_name.indexOf(','));
                }
                else {
                    tournament_name = full_tournament_name;
                }
            
                // if (compDetails.competition.type = 'mixed_doubles') {
                //     compDetails.competition.type = 'doubles';
                // }
                //category = capitalizeFirstLetter(compDetails.competition.gender) + " " + capitalizeFirstLetter(compDetails.competition.type);
                if (full_tournament_name.includes(',')) {
                category = "-" + full_tournament_name.substr(full_tournament_name.indexOf(", "), full_tournament_name.length);
                category = category.replace(/,/g, '')
                    
                }
                else {
                    //category = '-' + '';
                }
            
                //round = match_details.sport_event.tournament_round.name;
                if (compDetails.tournament_round) {
                    if (compDetails.tournament_round.name) {
                        round = compDetails.tournament_round.name.replaceAll('_', ' ');
                        round = capitalizeFirstLetter(round);
                    }
                
                    else {
                        round = capitalizeFirstLetter(compDetails.tournament_round.type);
                    }
                }
                else {
                    round = 'Group';
                }
                
                
                
            }
            competitors = match_details.sport_event.competitors;
            homeCompObj = competitors[0];
            awayCompObj = competitors[1];
            homeCompName = homeCompObj.name;
            awayCompName = awayCompObj.name;
            if (category.includes('Singles')) {
                home_country_code = homeCompObj.country_code;
                away_country_code = awayCompObj.country_code;
                if (category == 'Singles') {
                    category = "Men Singles";
                }
            }
            else {
                if (homeCompObj.country_code) {
                // home_country_code = homeCompObj.players[0].country_code; 
                }
                else {
                    home_country_code = "N/A";
                }
                if (awayCompObj.country_code){
                    //away_country_code = awayCompObj.players[0].country_code;
                }
                else{
                    away_country_code = "N/A";
                }
                if (category == "Doubles") {
                    category = "Men Doubles";
                }
            }
            //***** */

            if (match_details.sport_event_status.status == "closed" || match_details.sport_event_status.status == "live" || match_details.sport_event_status.status == "finished" || match_details.sport_event_status.status == "ended") {
                console.log("closed... or live");
                if (match_details.sport_event_status.status == "closed") {
                    match_details.sport_event_status.status = "finished";
                }
                status = capitalizeFirstLetter(match_details.sport_event_status.status);

                if (match_details.sport_event_status.winning_reason != "walkover") {
                    scores = match_details.sport_event_status.period_scores;
                    homeSetScore = match_details.sport_event_status.home_score;
                    awaySetScore = match_details.sport_event_status.away_score;
                    scoreSet1 = scores[0];
                    homeScore1 = scoreSet1.home_score;
                    awayScore1 = scoreSet1.away_score;
                    scoreSet2 = scores[1] ?? null;
                    homeScore2 = "";
                    awayScore2 = "";
                    if (scoreSet2 != null) {
                    homeScore2 = scoreSet2.home_score;
                    awayScore2 = scoreSet2.away_score;
                    }
                    scoreSet3 = scores[2] ?? null;
                    homeScore3 = "";
                    awayScore3 = "";
                    if (scoreSet3 != null) {
                        homeScore3 = scoreSet3.home_score
                        awayScore3 = scoreSet3.away_score 
                    }

                    if (category.includes('Singles')) {
                        if (homeCompName.length > 25) {
                            homeCompName = homeCompObj.abbreviation;
                        }
                        if (awayCompName.length > 25) {
                            awayCompName = awayCompObj.abbreviation;
                        }
                    }

                    if (category.includes('Doubles')) {
                        if (homeCompName.length > 25) {
                            homeCompName = homeCompObj.abbreviation;
                        }
                        if (awayCompName.length > 25) {
                            awayCompName = awayCompObj.abbreviation;
                        }
                        
                    }
                    
                }
                else if (match_details.sport_event_status.match_status == "walkover" || match_details.sport_event_status.winning_reason == "walkover") {
                    status = "Walkover";
                }

            }    

            else if (match_details.sport_event_status.status == 'cancelled' ) { 
                status = "Cancelled"; 
            }


            else if ( match_details.sport_event_status.status == "not_started" ) {
                status = "Not Started";
            }

            else{}
            
        
            
            
                // var competitors = match_details.sport_event.competitors;
                // var homeCompObj = competitors[0];
                // var awayCompObj = competitors[1];
                
                // if (compDetails.competition.type == 'doubles') {
                
            
                
                // var homeCompName = homeCompObj.name;
                // var awayCompName = awayCompObj.name;
                
            
                
                // var scoreSet3;
                
                // console.log(tours[tour].sport_event.competitors);
                // console.log(tours[tour].sport_event_status.period_scores);
                // console.log('-----------------------------------------');
                //$(".card #name1").innerHTML(tours[tour].sport_event.competitors[0].name);
                //$('.card ')
            var matchCard = `<div class="column">` +
                `<div class="card">` +
                    `<table>` +
                        `<h2> ${tournament_name} </h2>` +
                        `<h3> ${round}  ${category} </h3>` +
                        
                        `<thead>` +
                        `<tr>` +
                            `<th></th>` +
                            `<th></th>` +
                            `<th>1</th>` +
                            `<th>2</th>` +
                            `<th>3</th>` +
                            `<th>Final</th>` +
                        `</tr>` +
                        `</thead>` +
                        `<tbody>` +
                        `<tr>` +
                            `<td data-th="CTR"> ${home_country_code} </td>` +
                            `<td data-th="Comp">` +
                            `<span class="long">${homeCompName}</span>` +
                            
                            `</td>` +
                            `<td data-th="1">${homeScore1}</td>` +
                            `<td data-th="2">${homeScore2}</td>` +
                            `<td data-th="3">${homeScore3}</td>` +
                            `<td data-th="Final">${homeSetScore}</td>` +
                        `</tr>` +
                        `<tr>` +
                            `<td data-th="CTR"> ${away_country_code} </td>` +
                            `<td data-th="Comp">` +
                            `<span class="long">${awayCompName}</span>`+
                            `</td>`+
                            `<td data-th="1">${awayScore1}</td>` +
                            `<td data-th="2">${awayScore2}</td>` +
                            `<td data-th="3">${awayScore3}</td>` +
                            `<td data-th="Final">${awaySetScore}</td>` +
                        `</tr>` +
                        `</tbody>` +
                        
                    `</table>` +
                    // `<h4> ${startTime} - ${status} </h4>` +
                    `<h4> ${matchTime} - ${status} </h4>` +
                `</div>` +
            `</div>`;

            $('.row').append(matchCard);
        }
        catch {
            continue
        }
        
    }
}
    
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
function APITimeToLocal(apitime){
    //2021-03-20T13:00:00+00:00
    // const timeParts = apitime.split('-');
    // var dateAndTime = timeParts[2].split('T');
    // var Time = dateAndTime[1];
    // var realTime = Time.substr(0,Time.indexOf('+'));
    // var start_time = timeParts[0] + '-' + timeParts[1] + '-' + Time[0] + " " + realTime;
    var ridofPlus = apitime.split('+');
    var utcTime = ridofPlus[0];
    var start_time = new Date(utcTime + 'Z');
    console.log(start_time);
    start_time = start_time.toString();
    var splitTimes = start_time.split(' ');
    var month = splitTimes[1];
    var date = splitTimes[2];
    var year = splitTimes[3];
    var time = splitTimes[4];
    time = time.split(':');
    var hour = time[0];
    var minute = time[1];
    
   
    realStartTime = month + " " + date + " " + hour + ":" + minute;
    console.log("real: " + realStartTime);
    return realStartTime;
}


//const picker = datepicker(selector, options)
const picker = datepicker('.datepicker', {
    onSelect: (instance, date) => {
      console.log("PICKED)");
      // Do stuff when a date is selected (or unselected) on the calendar.
      // You have access to the datepicker instance for convenience.
    }
  })
  