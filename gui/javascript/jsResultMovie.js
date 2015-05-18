
// Global vars
var contentMovie;
var loadingMovie;

// This function makes the ajax request
function callRequestMovies(urlMovie)
{
    // Validate browser
    if (window.XMLHttpRequest)
        req = new XMLHttpRequest();
    else if (window.ActiveXObject) {

        req = new ActiveXObject("Microsoft.XMLHTTP");
    } else {

        req = new ActiveXObject("Msxml2.XMLHTTP");
    }
    req.onreadystatechange = responseReadyMovie;
    req.open("GET", urlMovie, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(null);

}

// Manipulates the ajax state change
function responseReadyMovie() {
    contentMovie = "listDataMovie";
    loadingMovie = "loadSearchMovie";

    var elemMovie = document.getElementById(contentMovie);
    var elemMovie2 = document.getElementById(loadingMovie);

    if (req.readyState === 1) {
        if (elemMovie2 !== null) {
            // Loading image rendered
            elemMovie2.innerHTML = '<i class="fa fa-cog fa-spin"></i>' +
                    '<font color="green">&nbsp;&nbsp;Loading movies... please wait</font>';
        }

    } else if (req.readyState === 4) {

        if (req.status === 200) {

            //elemMovie.innerHTML = req.responseText;
            var text = req.responseText;

            // Get response
            renderResponseMovie(text);

            if (elemMovie2 !== null) {
                elemMovie2.innerHTML = "";
            }

        } else if (req.status === 404) {
            elemMovie2.innerHTML = "";
            elemMovie.innerHTML = '<font color="red">Address not found in movies.</font>';
        } else {
            elemMovie2.innerHTML = "";
            elemMovie.innerHTML = '<font color="red">Movies, error:' + req.status + '.</font>';
        }

    }
}

// Get the json object and render it 
function renderResponseMovie(text) {
    var elemento = document.getElementById(contentMovie);

    // Parse json data for javascript
    var jsonMovies = JSON.parse(text);

    var totalMovies = jsonMovies.total_results;

    //elemento.innerHTML = "Listo movies: "+jsonParsed;

    if (totalMovies === 0) {
        elemento.innerHTML = '<font color="red">It seems like we don not have any movies search results for you. Try again! </font>';
    }
    else {
        renderMovie(jsonMovies, jsonMovies.results.length);
    }

}

function renderMovie(obJsonMov, totalMov) {
    var elementMovies = document.getElementById(contentMovie);
    
    var posterPrefix = 'http://image.tmdb.org/t/p/w500';
    
    var printMovies = '';

    for (var mov = 0; mov < totalMov; mov++) {
        
        var movieID = obJsonMov.results[mov].id;
        
        var movieOrgTitle = obJsonMov.results[mov].original_title;
        
        var strMovDate = '';
        var movieYear = '';
        
        if ( obJsonMov.results[mov].release_date === null){
            movieYear = 'unknown';
        }
        else {
            strMovDate = obJsonMov.results[mov].release_date;
            movieYear = strMovDate.substring(0, 4);
        }
        
        var movieTitle = obJsonMov.results[mov].title;
        
        var strMovPoster = obJsonMov.results[mov].poster_path === null ? '/TmdbSearchLM/images/movie-miss.png': posterPrefix + obJsonMov.results[mov].poster_path;
        
        var imgMovPoster = '<img src="' + strMovPoster + '" width="50" height="50" alt="'+movieOrgTitle+'">';
        
        //var movHref = 'http://api.themoviedb.org/3/movie/'+movieID+myAPIKey; 
        
        printMovies += '<tr rowspan="2"><td>' + imgMovPoster + '</td> <td>'
                +'<a title="'+movieOrgTitle+'" href="#tabr3" onclick="callRequestMovieTab('+movieID+');">'
                + movieOrgTitle +'</a> (' + movieYear + ') <br> Aka: '+movieTitle + '</td></tr>';
    }
    
    elementMovies.innerHTML = '<table class="striped tight sortable">' + printMovies + '</table>';

}
