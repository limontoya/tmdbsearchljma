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
    
    // reset other tabs
    document.getElementById('tab1').style.display = "none";
    document.getElementById('tab2').style.display = "none";
    document.getElementById('tab3').style.display = "none";
    document.getElementById('tab1a').style.background = "#f5f5f5";
    document.getElementById('tab1a').style.borderBottom = "1px solid #e5e5e5";
    document.getElementById('tab2a').style.background = "#f5f5f5";
    document.getElementById('tab2a').style.borderBottom = "1px solid #e5e5e5";
    document.getElementById('tab3a').style.background = "#f5f5f5";
    document.getElementById('tab3a').style.borderBottom = "1px solid #e5e5e5";
    
    // shows content of selected tab
    document.getElementById('tab4').style.display = "block";
    document.getElementById('tab4a').style.display = "block";
    document.getElementById('tab4a').style.background = "#ffffff";
    document.getElementById('tab4a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
    document.getElementById('tab4a').style.mozboxShadow =  "none";//	-moz-box-shadow: none;
    document.getElementById('tab4a').style.boxShadow =  "none";//box-shadow: none;
    document.getElementById('tab4a').style.borderBottom = "1px solid #fffff";
    
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
            elemPeopleTab2.innerHTML = '<img src="http://tmdbsearchljma.appspot.com/images/ajax-ljma.gif" alt="...">' +
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
    
    document.getElementById('peopleRetrn').innerHTML = 'Person ';

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

    var strPplProfile = obJsonPpl.profile_path === null ? 'http://tmdbsearchljma.appspot.com/images/person-miss.png' : profilePrefix + obJsonPpl.profile_path;

    var imgPplProfile = '<img class="caption" src="' + strPplProfile + '" width="200" height="300" alt="' + personName + '">';


    printPeople += '<tr><td><h3>' + personName + '</h3><br> <b>Place of birth: </b>'
            + (placeOfBirth === null ? 'Not found info about Place of birth.' : placeOfBirth )+ '<br><b> Birthday: </b>' 
            + (birthday === null ? 'Not found info about this person birthday.' : birthday)+ '<br><b> Biography: </b>' 
            + (bio === null ? 'Not BIO found.' : bio)+ '</td>'
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
            elemFilmTab2.innerHTML = '<img src="http://tmdbsearchljma.appspot.com/images/ajax-ljma.gif" alt="...">' +
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

        var strMovPoster = obJsonFilm.cast[flm].poster_path === null ? 'http://tmdbsearchljma.appspot.com/images/movie-miss.png' : posterPrefix + obJsonFilm.cast[flm].poster_path;

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
       
        printFilms += ' &nbsp;&nbsp;<div class="contenedorFilm"><a title="' + movieName + '" href="javascript:void(0);" onclick="callRequestMovieTab(' + movieID + ');">'
                + imgMovPoster +'<br>'+  movieName + ' <br>Character: ' + obJsonFilm.cast[flm].character + '<br>Year: ' + movieYearFilm + '</a></div>';

    }
    elementFilmCast.innerHTML = '<div id="principalFilm">' + printFilms + '</div>';

}

