// Global vars
var contentPeopleTab;
var loadingPeopleTab;
var contentPeopleFilmTab;
var loadingPeopleFilmTab;

// This function makes the ajax request
function callRequestPeopleTab(personID)
{
    // Validate browser
    if (window.XMLHttpRequest)
        reqp = new XMLHttpRequest();
    else if (window.ActiveXObject) {

        reqp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {

        reqp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    

    var urlPeopleTab = 'http://api.themoviedb.org/3/person/' + personID + myAPIKey;

    reqp.onreadystatechange = responseReadyPeopleTab;
    reqp.open("GET", urlPeopleTab, true);
    reqp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    reqp.send(null);

}

function callRequestFilm(personID)
{
    // Validate browser
    if (window.XMLHttpRequest)
        req = new XMLHttpRequest();
    else if (window.ActiveXObject) {

        req = new ActiveXObject("Microsoft.XMLHTTP");
    } else {

        req = new ActiveXObject("Msxml2.XMLHTTP");
    }

    var urlPeopleFilmTab = 'http://api.themoviedb.org/3/person/' + personID + '/movie_credits' + myAPIKey;

    req.onreadystatechange = responseReadyPeopleFilmTab;
    req.open("GET", urlPeopleFilmTab, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(null);

}


// Manipulates the ajax state change
function responseReadyPeopleTab() {
    contentPeopleTab = "listDataPeopleTab";
    loadingPeopleTab = "loadPeopleTab";

    var elemPeopleTab = document.getElementById(contentPeopleTab);
    var elemPeopleTab2 = document.getElementById(loadingPeopleTab);

    if (reqp.readyState === 1) {
        if (elemPeopleTab2 !== null) {
            // Loading image rendered
            elemPeopleTab2.innerHTML = '<i class="fa fa-cog fa-spin"></i>' +
                    '<font color="green">&nbsp;&nbsp;Loading people... please wait</font>';
        }

    } else if (reqp.readyState === 4) {

        if (reqp.status === 200) {

            //elemPeople.innerHTML = reqp.responseText;
            var text = reqp.responseText;

            // Get response
            renderResponsePeopleTab(text);

            if (elemPeopleTab2 !== null) {
                elemPeopleTab2.innerHTML = "";
            }

        } else if (reqp.status === 404) {
            elemPeopleTab2.innerHTML = "";
            elemPeopleTab.innerHTML = '<font color="red">Address in People not found.</font>';
        } else {
            elemPeopleTab2.innerHTML = "";
            elemPeopleTab.innerHTML = '<font color="red">People, error:' + reqp.status + '.</font>';
        }

    }
}

// Get the json object and render it 
function renderResponsePeopleTab(text) {
    var elementoTab = document.getElementById(contentPeopleTab);

    // Parse json data for javascript
    var jsonPeopleTab = JSON.parse(text);

    renderPersonTab(jsonPeopleTab);

}

// Get the json object and render it 
function renderResponseFilm(ftext) {
    var elementoFilm = document.getElementById(contentPeopleFilmTab);

    // Parse json data for javascript
    var jsonPeopleFilm = JSON.parse(ftext);

    var totalPeopleFilm = jsonPeopleFilm.cast.length;

    //elemento.innerHTML = "Listo person: "+jsonParsed;
    if (totalPeopleFilm === 0) {
        elementoFilm.innerHTML = '<font color="red">It seems like we do not have any films results for you. Try again! </font>';
    }
    else {
        renderFilmCast(jsonPeopleFilm, totalPeopleFilm);
    }

}

function renderPersonTab(obJsonPpl) {
    var elementPeopleTab = document.getElementById(contentPeopleTab);

    var profilePrefix = 'http://image.tmdb.org/t/p/w500';

    var printPeople = '';

    var personName = obJsonPpl.name;
    var placeOfBirth = obJsonPpl.place_of_birth;
    var birthday = obJsonPpl.birthday;
    var bio = obJsonPpl.biography;

    var strPplProfile = obJsonPpl.profile_path === null ? '/TmdbSearchLM/images/person-miss.png' : profilePrefix + obJsonPpl.profile_path;

    var imgPplProfile = '<img class="caption" src="' + strPplProfile + '" width="200" height="300" alt="' + personName + '">';


    printPeople += '<tr><td><h3>' + personName + '</h3><br> <b>Place of birth: </b>'
            + placeOfBirth + '<br><b> Birthday: </b>' + birthday + '<br><b> Biography: </b>' + bio + '</td>'
            + '<td rowspan="2">' + imgPplProfile + ' </td></tr> ';


    elementPeopleTab.innerHTML = '<table class="striped tight sortable">' + printPeople + '</table>';

//when finish loading person, bring filmography
    callRequestFilm(obJsonPpl.id);

}//********************

function responseReadyPeopleFilmTab() {
    contentPeopleFilmTab = "listDataPeopleFilmTab";
    loadingPeopleFilmTab = "loadPeopleFilmTab";


    var elemFilmTab = document.getElementById(contentPeopleFilmTab);
    var elemFilmTab2 = document.getElementById(loadingPeopleFilmTab);

    if (req.readyState === 1) {
        if (elemFilmTab2 !== null) {
            // Loading image rendered
            elemFilmTab2.innerHTML = '<i class="fa fa-cog fa-spin"></i>' +
                    '<font color="green">&nbsp;&nbsp;Loading crew movie information... please wait</font>';
        }

    } else if (req.readyState === 4) {

        if (req.status === 200) {

            //elemMovieTab.innerHTML = req.responseText;
            var textFilm = req.responseText;

            // Get response
            renderResponseFilm(textFilm);

            if (elemFilmTab2 !== null) {
                elemFilmTab2.innerHTML = "";
            }

        } else if (req.status === 404) {
            elemFilmTab2.innerHTML = "";
            elemFilmTab.innerHTML = '<font color="red">Address not found in movies.</font>';
        } else {
            elemFilmTab2.innerHTML = "";
            elemFilmTab.innerHTML = '<font color="red">Movies crew, error:' + req.status + '.</font>';
        }

    }
}


function renderFilmCast(obJsonFilm, totalFilms) {
    var elementFilmCast = document.getElementById(contentPeopleFilmTab);

    var posterPrefix = 'http://image.tmdb.org/t/p/w500';

    var printFilms = '';

    for (var flm = 0; flm < totalFilms; flm++) {

        var movieID = obJsonFilm.cast[flm].id;

        var movieName = obJsonFilm.cast[flm].original_title;

        var strMovPoster = obJsonFilm.cast[flm].poster_path === null ? '/TmdbSearchLM/images/movie-miss.png' : posterPrefix + obJsonFilm.cast[flm].poster_path;

        var imgMovPoster = '<img class="caption" src="' + strMovPoster + '" width="100" height="100" alt="' + obJsonFilm.cast[flm].original_title + '">';

        var sepKM = ', ';
        sepKM = flm === totalFilms - 1 ? ' ' : sepKM;

        var strMovDateF = '';
        var movieYearFilm = '';

        if (obJsonFilm.cast[flm].release_date === null) {
            movieYearFilm = 'unknown';
        }
        else {
            strMovDateF = obJsonFilm.cast[flm].release_date;
            movieYearFilm = strMovDateF.substring(0, 4);
        }
       
        printFilms += ' &nbsp;&nbsp; <a title="' + movieName + '" href="javascript:void(0);" onclick="callRequestMovieTab(' + movieID + ');">'
                + imgMovPoster +  movieName + ' <br>Character: ' + obJsonFilm.cast[flm].character + '<br>Year: ' + movieYearFilm + '</a>';

    }
    elementFilmCast.innerHTML = '<div class="gallery">' + printFilms + '</div>';

}

