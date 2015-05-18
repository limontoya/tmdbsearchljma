
// Global vars
var searchtxt = '';
// My API Key
var myAPIKey = '?api_key=7ce83203cac071b99a03223afe399640';

// Complementary data for search
var comSearch = '&language=es&page=1&include_adult=false&sort_by=popularity.desc&query=';

// Search call
var apiSearchMovie = 'https://api.themoviedb.org/3/search/movie';
var apiSearchPeople = 'https://api.themoviedb.org/3/search/person';

// Gets the data inserted/selected on textfield
try {
    searchtxt = document.getElementById("searchQ");

} catch (err) {
    // Catch if null exception
    document.getElementById("error").innerHTML = err.message;
}

// If user press intro key it also does search
searchtxt.onkeydown = function(e) {
    if (e.keyCode === 13) {
        // Validate if searchtxt has inputs
        if (searchtxt.value !== null
                & searchtxt.value !== undefined
                & searchtxt.value !== '') {
            document.getElementById("errorSearchCall").innerHTML = '';

            searchAll();
        }
        else {
            document.getElementById("errorSearchCall").innerHTML = 'Please enter a query';
        }
    }
};

// This function generate url before calling the ajax request
function searchAll() {
    // Query given
    var queryInput = searchtxt.value;

    if (searchtxt.value !== null
            & searchtxt.value !== undefined
            & searchtxt.value !== '') {
        document.getElementById("errorSearchCall").innerHTML = '';

        // Call ajax request for movies
        var urlMovie = apiSearchMovie + myAPIKey + comSearch + queryInput;
        // Call ajax request for people
        var urlPeople = apiSearchPeople + myAPIKey + comSearch + queryInput;

        callRequestMovies(urlMovie);
        setTimeout(callRequestPeople(urlPeople), 1000);
    }
    else {
        document.getElementById("errorSearchCall").innerHTML = 'Please enter a query';
    }

}
