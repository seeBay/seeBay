function getFixturesByDate(date) {
    var url = 'http://localhost:8080/fixtures/byDate?callback=?';

    $.ajax({
     type: 'GET',
     data: { "date": today() },
     url: url,
     async: false,
     jsonpCallback: 'jsonCallback',
     contentType: "application/json",
     dataType: 'jsonp',
     success: function(json) {
         populateFixturse(json.fixtures);
     },
     error: function(json) {
         console.log(json.messages);
     }
 });
}

function populateFixturse(fixtures){
    $.each(fixtures, function(index, fixture ) {
            $('.fixtures > .elements').append(getFixture(fixture));
    });
}

function getFixture(fixture){
    var listElement = '<li class="fixture">';
    listElement = listElement + '<span class="kickOffDate">' + fixture.kickOff.date + '</span>';
    listElement = listElement + '<span class="kickOffTime">' + fixture.kickOff.time + '</span>';
    listElement = listElement + '<span class="home team">' + fixture.homeTeam +'</span>';
    listElement = listElement + '<span class="vs">'+fixture.score+'</span>';
    listElement = listElement + '<span class="away team">' + fixture.awayTeam +'</span>';
    listElement = listElement + '</li>';
    return listElement;
}

function initialize(){
    getFixturesByDate(today());
}

function today(){
    return new Date().getFullYear()
    + "-" + (new Date().getMonth() + 1)
    + "-" + (new Date().getDate() )
}

$(document).ready( initialize() );

