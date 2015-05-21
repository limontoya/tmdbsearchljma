
// Global vars
var contentMovieTab;
var loadingMovieTab;
var contentMovieCrewTab;
var loadingMovieCrewTab;
var contentMovieCastTab;
var loadingMovieCastTab;

// This function makes the ajax request
function callRequestMovieTab(movieID)
{
    // Validate browser
    if (window.XMLHttpRequest)
        req = new XMLHttpRequest();
    else if (window.ActiveXObject) {

        req = new ActiveXObject("Microsoft.XMLHTTP");
    } else {

        req = new ActiveXObject("Msxml2.XMLHTTP");
    }
    
    // reset other tabs
    document.getElementById('tab1').style.display = "none";
    document.getElementById('tab2').style.display = "none";
    document.getElementById('tab4').style.display = "none";
    document.getElementById('tab1a').style.background = "#f5f5f5";
    document.getElementById('tab1a').style.borderBottom = "1px solid #e5e5e5";
    document.getElementById('tab2a').style.background = "#f5f5f5";
    document.getElementById('tab2a').style.borderBottom = "1px solid #e5e5e5";
    document.getElementById('tab4a').style.background = "#f5f5f5";
    document.getElementById('tab4a').style.borderBottom = "1px solid #e5e5e5";
    
    // shows content of selected tab
    document.getElementById('tab3').style.display = "block";
    document.getElementById('tab3a').style.display = "block";
    document.getElementById('tab3a').style.background = "#ffffff";
    document.getElementById('tab3a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
    document.getElementById('tab3a').style.mozboxShadow =  "none";//	-moz-box-shadow: none;
    document.getElementById('tab3a').style.boxShadow =  "none";//box-shadow: none;
    document.getElementById('tab3a').style.borderBottom = "1px solid #fffff";

    var urlMovieTab = 'http://api.themoviedb.org/3/movie/' + movieID + myAPIKey;

    req.onreadystatechange = responseReadyMovieTab;
    req.open("GET", urlMovieTab, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(null);

}

function callRequestCrew(movieID)
{
    // Validate browser
    if (window.XMLHttpRequest)
        req = new XMLHttpRequest();
    else if (window.ActiveXObject) {

        req = new ActiveXObject("Microsoft.XMLHTTP");
    } else {

        req = new ActiveXObject("Msxml2.XMLHTTP");
    }

    var urlMovieCrewTab = 'http://api.themoviedb.org/3/movie/' + movieID + '/credits' + myAPIKey;

    req.onreadystatechange = responseReadyMovieCrewTab;
    req.open("GET", urlMovieCrewTab, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(null);

}

// Manipulates the ajax state change
function responseReadyMovieTab() {
    contentMovieTab = "listDataMovieTab";
    loadingMovieTab = "loadMovieTab";

    var elemMovieTab = document.getElementById(contentMovieTab);
    var elemMovieTab2 = document.getElementById(loadingMovieTab);

    if (req.readyState === 1) {
        if (elemMovieTab2 !== null) {
            // Loading image rendered
            elemMovieTab2.innerHTML = '<img src="http://tmdbsearchljma.appspot.com/images/ajax-ljma.gif" alt="...">' +
                    '<font color="green">&nbsp;&nbsp;Loading movie information... please wait</font>';
        }

    } else if (req.readyState === 4) {

        if (req.status === 200) {

            //elemMovieTab.innerHTML = req.responseText;
            var textTab = req.responseText;

            // Get response
            renderResponseMovieTab(textTab);

            if (elemMovieTab2 !== null) {
                elemMovieTab2.innerHTML = "";
            }

        } else if (req.status === 404) {
            elemMovieTab2.innerHTML = "";
            elemMovieTab.innerHTML = '<font color="red">Address not found in movies.</font>';
        } else {
            elemMovieTab2.innerHTML = "";
            elemMovieTab.innerHTML = '<font color="red">Movies, error:' + req.status + '.</font>';
        }

    }
}

// Get the json object and render it 
function renderResponseMovieTab(text) {
    var elemento = document.getElementById(contentMovieTab);

    // Parse json data for javascript
    var jsonMovieTab = JSON.parse(text);

    var totalMovieTab = jsonMovieTab.total_results;
    
    document.getElementById('movieRetrn').innerHTML = 'Movie ';

    if (totalMovieTab === 0) {
        elemento.innerHTML = '<font color="red">It seems like we do not have any movies search results for you. Try again! </font>';
    }
    else {
        renderMovieTab(jsonMovieTab);
    }

}

function renderMovieTab(obJsonMovTab) {
    var elementMovieTab = document.getElementById(contentMovieTab);

    var strMovDate2 = '';
    var movieYearTab = '';

    if (obJsonMovTab.release_date === null) {
        movieYearTab = 'unknown';
    }
    else {
        strMovDate2 = obJsonMovTab.release_date;
        movieYearTab = strMovDate2.substring(0, 4);
    }

    var posterPrefix = 'http://image.tmdb.org/t/p/w500';

    var strMovPoster = obJsonMovTab.poster_path === null ? 'http://tmdbsearchljma.appspot.com/images/movie-miss.png' : posterPrefix + obJsonMovTab.poster_path;

    var imgMovPoster = '<img src="' + strMovPoster + '" width="200" height="300" alt="' + obJsonMovTab.original_title + '">';

    var printMovie = '<tr><td><h3>' + obJsonMovTab.original_title + ' (' + movieYearTab + ') </h3>'
            + '<br><b>Aka: </b>' + obJsonMovTab.title
            + '<br><b>Rating: </b><img src="http://tmdbsearchljma.appspot.com/images/gold-star.png" width="20" height="20" alt="' + obJsonMovTab.vote_average + '">' + obJsonMovTab.vote_average
            + '<br><b>Overview: </b>' + (obJsonMovTab.overview ===null ? 'Overview not found.' : obJsonMovTab.overview ) + '</td>'
            + '<td rowspan="2">' + imgMovPoster + ' </td></tr> ';


    elementMovieTab.innerHTML = '<table class="striped tight sortable">' + printMovie + '</table>';

    //when finish loading movie, bring crew and cast
    callRequestCrew(obJsonMovTab.id);

}

function responseReadyMovieCrewTab() {
    contentMovieCrewTab = "listDataMovieCrewTab";
    loadingMovieCrewTab = "loadMovieCrewTab";

    contentMovieCastTab = "listDataMovieCastTab";
    loadingMovieCastTab = "loadMovieCastTab";

    var elemMovieCrewTab = document.getElementById(contentMovieCrewTab);
    var elemMovieCrewTab2 = document.getElementById(loadingMovieCrewTab);

    if (req.readyState === 1) {
        if (elemMovieCrewTab2 !== null) {
            // Loading image rendered
            elemMovieCrewTab2.innerHTML = '<img src="http://tmdbsearchljma.appspot.com/images/ajax-ljma.gif" alt="...">' +
                    '<font color="green">&nbsp;&nbsp;Loading crew movie information... please wait</font>';
        }

    } else if (req.readyState === 4) {

        if (req.status === 200) {

            //elemMovieTab.innerHTML = req.responseText;
            var textCrew = req.responseText;

            // Get response
            renderResponseCrew(textCrew);

            if (elemMovieCrewTab2 !== null) {
                elemMovieCrewTab2.innerHTML = "";
            }

        } else if (req.status === 404) {
            elemMovieCrewTab2.innerHTML = "";
            elemMovieCrewTab.innerHTML = '<font color="red">Address not found in movies.</font>';
        } else {
            elemMovieCrewTab2.innerHTML = "";
            elemMovieCrewTab.innerHTML = '<font color="red">Movies crew, error:' + req.status + '.</font>';
        }

    }
}

function renderResponseCrew(text) {
    var elementoCrew = document.getElementById(contentMovieCrewTab);

    // Parse json data for javascript
    var jsonMovieCrew = JSON.parse(text);

    var totalMovieCrew = jsonMovieCrew.crew.length;
    var totalMovieCast = jsonMovieCrew.cast.length;


    if (totalMovieCrew === 0) {
        elementoCrew.innerHTML = '<font color="red">It seems like we do not have any person search results for you. Try again! </font>';
    }
    else {
        //alert ('crew length' + totalMovieCrew + 'cast '+totalMovieCast); //+ jsonMovieCrew.crew.length);
        renderCast(jsonMovieCrew, totalMovieCast);
        setTimeout(renderCrew(jsonMovieCrew, totalMovieCrew), 1000);

    }

}


function renderCast(obJsonCrew, totalPpl) {
    var elementMovieCast = document.getElementById(contentMovieCastTab);

    var profilePrefix = 'http://image.tmdb.org/t/p/w500';

    var printPeople = '';

    for (var ppl = 0; ppl < totalPpl; ppl++) {

        var personID = obJsonCrew.cast[ppl].id;

        var personName = obJsonCrew.cast[ppl].name;

        var strPplProfile = obJsonCrew.cast[ppl].profile_path === null ? 'http://tmdbsearchljma.appspot.com/images/person-miss.png' : profilePrefix + obJsonCrew.cast[ppl].profile_path;

        var imgPplProfile = '<img class="caption" src="' + strPplProfile + '" width="50" height="50" alt="' + personName + '">';

        var sepKM = ', ';
        sepKM = ppl === totalPpl - 1 ? ' ' : sepKM;

        printPeople += ' &nbsp;&nbsp;<div class="contenedorCast"> <a title="' + personName + '" href="javascript:void(0);" onclick="callRequestPeopleTab(' + personID + ');">'
                + imgPplProfile +'<br>'+ personName + '</a></div> ';

    }
    elementMovieCast.innerHTML = '<div id="principalCast">' + printPeople + '</div>';

}

function renderCrew(obJsonCrew, totalPpl) {
    var elementMovieCrew = document.getElementById(contentMovieCrewTab);

    var profilePrefix = 'http://image.tmdb.org/t/p/w500';

    var printPeople = '';

    for (var ppl = 0; ppl < totalPpl; ppl++) {

        var personID = obJsonCrew.crew[ppl].id;

        var personName = obJsonCrew.crew[ppl].name;

        var strPplProfile = obJsonCrew.crew[ppl].profile_path === null ? 'http://tmdbsearchljma.appspot.com/images/person-miss.png' : profilePrefix + obJsonCrew.crew[ppl].profile_path;

        var imgPplProfile = '<img class="caption" src="' + strPplProfile + '" width="50" height="50" alt="' + personName + '">';

        var sepKM = ', ';
        sepKM = ppl === totalPpl - 1 ? ' ' : sepKM;

        printPeople += ' &nbsp;&nbsp; <div class="contenedorCast"><a title="' + personName + '" href="javascript:void(0);" onclick="callRequestPeopleTab(' + personID + ');">'
                + imgPplProfile +'<br>'+ personName + '</a></div> ';

    }
    elementMovieCrew.innerHTML = '<div id="principalCrew">' + printPeople + '</div>';

}

