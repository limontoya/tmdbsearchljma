// Global vars
var contentPeople;
var loadingPeople;

// This function makes the ajax request
function callRequestPeople(urlPeople)
{
    // Validate browser
    if (window.XMLHttpRequest)
        reqp = new XMLHttpRequest();
    else if (window.ActiveXObject) {

        reqp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {

        reqp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    reqp.onreadystatechange = responseReadyPeople;
    reqp.open("GET", urlPeople, true);
    reqp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    reqp.send(null);

}

// Manipulates the ajax state change
function responseReadyPeople() {
    contentPeople = "listDataPeople";
    loadingPeople = "loadSearchPeople";

    var elemPeople = document.getElementById(contentPeople);
    var elemPeople2 = document.getElementById(loadingPeople);

    if (reqp.readyState === 1) {
        if (elemPeople2 !== null) {
            // Loading image rendered
            elemPeople2.innerHTML = '<i class="fa fa-cog fa-spin"></i>' +
                    '<font color="green">&nbsp;&nbsp;Loading people... please wait</font>';
        }

    } else if (reqp.readyState === 4) {

        if (reqp.status === 200) {

            //elemPeople.innerHTML = reqp.responseText;
            var rtext = reqp.responseText;

            // Get response
            renderResponsePeople(rtext);

            if (elemPeople2 !== null) {
                elemPeople2.innerHTML = "";
            }

        } else if (reqp.status === 404) {
            elemPeople2.innerHTML = "";
            elemPeople.innerHTML = '<font color="red">Address in People not found.</font>';
        } else {
            elemPeople2.innerHTML = "";
            elemPeople.innerHTML = '<font color="red">People, error:' + reqp.status + '.</font>';
        }

    }
}

// Get the json object and render it 
function renderResponsePeople(rtext) {
    var elemento = document.getElementById(contentPeople);

    // Parse json data for javascript
    var jsonPeople = JSON.parse(rtext);

    var totalPeople = jsonPeople.total_results;

    //elemento.innerHTML = "Listo person: "+jsonParsed;
    if (totalPeople === 0) {
        elemento.innerHTML = '<font color="red">It seems like we do not have any movies search results for you. Try again! </font>';
    }
    else {
        renderPeople(jsonPeople, jsonPeople.results.length);
    }

}

function renderPeople(obJsonPpl, totalPpl) {
    var elementPeople = document.getElementById(contentPeople);

    var profilePrefix = 'http://image.tmdb.org/t/p/w500';

    var printPeople = '';

    for (var ppl = 0; ppl < totalPpl; ppl++) {

        var personID = obJsonPpl.results[ppl].id;

        var personName = obJsonPpl.results[ppl].name;

        var strPplProfile = obJsonPpl.results[ppl].profile_path === null ? '/TmdbSearchLM/images/person-miss.png' : profilePrefix + obJsonPpl.results[ppl].profile_path;

        var imgPplProfile = '<img src="' + strPplProfile + '" width="50" height="50" alt="' + personName + '">';

        var knownMovies = '';
        var tamk = obJsonPpl.results[ppl].known_for.length;
        var sepKM = ', ';

        for (var k = 0; k < tamk; k++) {
            
            sepKM = k === tamk-1 ? ' ': sepKM;
            
            var movieAppearances = obJsonPpl.results[ppl].known_for[k].title;
            var movieAppearancesID = obJsonPpl.results[ppl].known_for[k].id;
            
            var movieApp = ' &nbsp;&nbsp; <a title="'+movieAppearances+'" href="javascript:void(0);" onclick="callRequestMovieTab('+movieAppearancesID+');">'
                + movieAppearances +'</a>';
            
            knownMovies += movieApp +sepKM;
            
        }

        printPeople += '<tr rowspan="2"><td>' + imgPplProfile + '</td> <td>'
                + ' <a title="' + personName + '" href="#tabr4" onclick="callRequestPeopleTab('+personID+');">'
                + personName + '</a> <br> Known for: '+knownMovies+'</td></tr>';

    }
    elementPeople.innerHTML = '<table class="striped tight sortable">' + printPeople + '</table>';

}
