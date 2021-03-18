var access_level = 't';
var version = '1';
version = '2';
var language_code = 'en';
var year, month, day;
var format = 'json';
var api_key = '5snqwectfqhnkrzc7x93tf5j';
year = '2021';
//month = '03';
//day = '07';
month = '01';
day = '17';
//var apiUrl = `https://api.sportradar.com/badminton-${access_level}${version}/${language_code}/schedules/${year}-${month}-${day}/results.${format}?api_key=${api_key}`;
//console.log(`https://api.sportradar.com/badminton-${access_level}${version}/${language_code}/schedules/${year}-${month}-${day}/results.${format}?api_key=${api_key}`);
var apiUrl;//= 'http://localhost:3000';
// $.getJSON(`https://api.sportradar.com/badminton-${access_level}${version}/${language_code}/schedules/${year}-${month}-${day}/results.${format}?api_key=${api_key}`, function(data) {
//     console.log(data);
// });
//
apiUrl = 'https://www.mybwfscores.com'; //server url
//apiUrl = 'http://18.162.188.240';
var corsHeader = { 'Access-Control-Allow-Origin': apiUrl};
var startTime = null;
//enter window
window.onload = function() {
    startTime = getDateTimeString();
    $("#time").html(startTime);
    console.log("LOADED");
    //console.log("LOADED IN");
    
    $.ajax({
        type: 'GET',
        //url: 'http://18.162.188.240:3000/enter',
        dataType: 'json',
        headers: corsHeader,
        url: apiUrl + '/enter',
        success: function(data){
            console.log("Pageload success call");
            //$(".card #name1").html("HJFJW");
            showData(data);
        }
    })
}

//exit window
window.addEventListener('beforeunload', function(e) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: apiUrl + '/leave',
        success: function(data){
            console.log("Page Unload success call");
        }
    })
})




var tData;

// var input = {
//     'access_level' : 'trial',
//     'version' : '2',
//     'language_code' : 'en',
//     'year' : '2021',
//     'month' : '01',
//     'day' : '16',
//     'format' : 'json'
// }

var thirtyMin = 30*60*1000;
//thirtyMin = 60000
setInterval(callAPI(), thirtyMin);

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

function getDateTime() {
//var datetime = new Date().toLocaleString();
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
    var dateTimeJson = {
        APImonth : month,
        APIday : date,
        APIyear : year
    }   
    APIday = dateTimeJson.date;
    APImonth = dateTimeJson.month;
    APIyear = dateTimeJson.year;
//apiURL = `https://api.sportradar.com/badminton/${access_level}/v${version}/${language_code}/schedules/${APIyear}-${APImonth}-${APIday}/summaries.${format}?api_key=${api_key}`;
//return dateTimeJson;
    return dateTimeJson;
}



function callAPI() {

    dateJson = getDateTime();

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
        //     for (var tour in tours) {
        //         console.log(tours[tour]);
        //         console.log(tours[tour].sport_event.competitors);
        //         console.log(tours[tour].sport_event_status.period_scores);
        //         console.log('-----------------------------------------');
        //         $(".Bruh").html(tours[tour].sport_event.competitors[0].name);
        //     }
        //     $(".Bruh").html(data[0]);
        }
    })
}

function showData(tournament) {
    var tours = tournament;
    console.log("CALLED SHOW DATA");
    $('.row').empty();
    for (var tour in tours) {
        
        var match_details = tours[tour];
        console.log(match_details);
        var full_tournament_name = "";
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
        // ******************
        var compDetails = match_details.sport_event.sport_event_context;
        if (!compDetails.season) {
            full_tournament_name = compDetails.competition.name;
            tournament_name = full_tournament_name;
            category = "N/A";
            round = capitalizeFirstLetter(compDetails.round.name);
        }

        else {
            full_tournament_name = compDetails.competition.name;
            tournament_name = full_tournament_name.substr(0,full_tournament_name.indexOf(','));
        
            if (compDetails.competition.type = 'mixed_doubles') {
                compDetails.competition.type = 'doubles';
            }
            //category = capitalizeFirstLetter(compDetails.competition.gender) + " " + capitalizeFirstLetter(compDetails.competition.type);
            category = full_tournament_name.substr(full_tournament_name.indexOf(", ")+2, full_tournament_name.length);
            //round = match_details.sport_event.tournament_round.name;
            round = capitalizeFirstLetter(compDetails.round.name);
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
            if (homeCompObj.players) {
                home_country_code = homeCompObj.players[0].country_code; 
            }
            else {
                home_country_code = "N/A";
            }
            if (awayCompObj.players){
                away_country_code = awayCompObj.players[0].country_code;
            }
            else{
                away_country_code = "N/A";
            }
            if (category == "Doubles") {
                category = "Men Doubles";
            }
        }
        //***** */

        if (match_details.sport_event_status.status == "closed" || match_details.sport_event_status.status == "live" || match_details.sport_event_status.status == "finished") {
            console.log("closed... or live");
            if (match_details.sport_event_status.status == "closed") {
                match_details.sport_event_status.status = "finished";
            }
            status = capitalizeFirstLetter(match_details.sport_event_status.status);

            if (match_details.sport_event_status.match_status != "walkover") {
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

                if (homeCompName.length > 25) {
                    homeCompName = homeCompObj.players[0].abbreviation + ' / ' + homeCompObj.players[1].abbreviation;
                }
                if (awayCompName.length > 25) {
                    awayCompName = awayCompObj.players[0].abbreviation+ ' / ' + awayCompObj.players[1].abbreviation;
                }
            }
            else if (match_details.sport_event_status.match_status == "walkover") {
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
                    `<h3> ${round} - ${category} </h3>` +
                    
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
                    `<h4> ${startTime} - ${status} </h4>` +
                `</table>` +
            `</div>` +
        `</div>`;

        $('.row').append(matchCard);
        
    }
}
    
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  