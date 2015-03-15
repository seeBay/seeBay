var FixtureRetriever = {
    getFixturesByDate: function(date){ 
        var url = 'http://localhost:8080/fixtures/byDate?callback=?';
        $.ajax({
           type: 'GET',
           data: { "date": date },
           url: url,
           async: false,
           jsonpCallback: 'jsonCallback',
           contentType: "application/json",
           dataType: 'jsonp',
           success: function(json) {
               FixtureParser.parseFixtures(json.fixtures);
           },
           error: function(json) {
               console.log(json.messages);
           }
       });
    }
};
var FixtureParser = {  
    parseFixtures: function(fixtures){
        $.each(fixtures, function(index, fixture ) {
            $('.fixtures > .elements').append(FixtureParser.getFixtureAsHTMLElement(fixture));
        });
    },
    getFixtureAsHTMLElement: function(fixture){
        var listElement = '<li class="fixture">';
        listElement = listElement + '<span class="kickOffDate">' + fixture.kickOff.date + '</span>';
        listElement = listElement + '<span class="kickOffTime">' + fixture.kickOff.time + '</span>';
        listElement = listElement + '<span class="home team">' + fixture.homeTeam +'</span>';
        listElement = listElement + '<span class="vs">'+fixture.score+'</span>';
        listElement = listElement + '<span class="away team">' + fixture.awayTeam +'</span>';
        listElement = listElement + '</li>';
        return listElement;
    },
    initialize: function(){
        FixtureRetriever.getFixturesByDate( FixtureParser.today() );
    },
    today: function(){
        return new Date().getFullYear()
        + "-" + (new Date().getMonth() + 1)
        + "-" + (new Date().getDate() )
    }
};
