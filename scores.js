


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
var apiUrl = 'http://localhost:3000/url';
// $.getJSON(`https://api.sportradar.com/badminton-${access_level}${version}/${language_code}/schedules/${year}-${month}-${day}/results.${format}?api_key=${api_key}`, function(data) {
//     console.log(data);
// });
apiUrl = 'http://localhost:3000/scores'; //server url

//enter window
window.onload = function() {
    console.log("LOADED");
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/enter',
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
        url: 'http://localhost:3000/leave',
        success: function(data){
            console.log("Page Unload success call");
        }
    })
})




var tData;

var input = {
    'access_level' : 'trial',
    'version' : '2',
    'language_code' : 'en',
    'year' : '2021',
    'month' : '01',
    'day' : '16',
    'format' : 'json'
}

function callAPI() {
    $.ajax({
        type: 'POST',
        data: JSON.stringify(input),
        dataType: 'json',
        contentType: "application/json",
        //crossDomain: true,
        //headers: {'Access-Control-Allow-Origin':'*'},
        //dataType: 'jsonp',
        url: apiUrl,
        success: function(data){
            console.log("SUCESS");
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
    for (var tour in tours) {
        
        
        var match_details = tours[tour];
        console.log(match_details);
        if (match_details.sport_event_status.status != 'cancelled') {
            
        
            var competitors = match_details.sport_event.competitors;
            var homeCompObj = competitors[0];
            var home_country_code = homeCompObj.players[0].country_code; 
            var homeCompName = homeCompObj.name;
        
            if (homeCompName.length > 30) {
                homeCompName = homeCompObj.players[0].abbreviation + ' / ' + homeCompObj.players[1].abbreviation;
            }
            var awayCompObj = competitors[1];
            var away_country_code = awayCompObj.players[0].country_code;
            var awayCompName = awayCompObj.name;
            var scores = match_details.sport_event_status.period_scores;
            var homeSetScore = match_details.sport_event_status.home_score;
            var awaySetScore = match_details.sport_event_status.away_score;
            var scoreSet1 = scores[0];
            var homeScore1 = scoreSet1.home_score;
            var awayScore1 = scoreSet1.away_score;
            var scoreSet2 = scores[1];
            var homeScore2 = scoreSet2.home_score;
            var awayScore2 = scoreSet2.away_score;
            var scoreSet3 = scores[2] ?? null;
            var homeScore3 = "";
            var awayScore3 = "";
            if (scoreSet3 != null) {
                homeScore3 = scoreSet3.home_score
                awayScore3 = scoreSet3.away_score 
            }
           
            var full_tournament_name;
            var tournament_name;
            var category;
            var round;
            var compDetails = match_details.sport_event.sport_event_context;
            if (!compDetails.season) {
                full_tournament_name = compDetails.competition.name;
                tournament_name = full_tournament_name;
                category = "N/A";
                round = capitalizeFirstLetter(compDetails.round.name);
            }
            // var scoreSet3;
            else {
                full_tournament_name = compDetails.competition.name;
                tournament_name = full_tournament_name.substr(0,full_tournament_name.indexOf(','));
                if (compDetails.competition.type = 'mixed_doubles') {
                    compDetails.competition.type = 'doubles';
                }
                category = capitalizeFirstLetter(compDetails.competition.gender) + " " + capitalizeFirstLetter(compDetails.competition.type);
                //category = full_tournament_name.substr(full_tournament_name.indexOf(", ")+2, full_tournament_name.length);
                //round = match_details.sport_event.tournament_round.name;
                round = capitalizeFirstLetter(compDetails.round.name);
               
            }
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
                    `</table>` +
                `</div>` +
            `</div>`;

            $('.row').append(matchCard);
        }
    }
}
    
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  