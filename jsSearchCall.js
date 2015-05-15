/* 
 This js makes an ajax call to themoviedb-org in order
 find persons (actors) and movies, and show it in this website.
 */

// Global vars
var searchtxt = '';
var searchcmb = '';
var searchByThis = '';
var content;
var loading;
var fields = 4;
var resultperPage = 5;
var resultShown = 0;

// Gets the data inserted/selected on textfield and combo box
try {
    searchtxt = document.getElementById("searchQ");
    searchcmb = document.getElementById("searchBy");

} catch (err) {
    // Catch if null exception
    document.getElementById("error").innerHTML = err.message;
}

// If user press inro key it also does search
searchtxt.onkeydown = function(e) {
    if (e.keyCode === 13) {
        // Validate if searchtxt has inputs
        if (searchtxt.value !== null 
                & searchtxt.value !== undefined 
                & searchtxt.value !== '') {
            document.getElementById("error").innerHTML = '';
            dropOldData();
            searchAll();
        }
        else
            document.getElementById("error").innerHTML = 'Please enter a query';
    }
};

// This function generate url before calling the ajax request
function searchAll() {

    // Type of search
    if (searchcmb.value === 'psn') {
        searchByThis = 'person';
    }
    else {
        searchByThis = 'movie';
    }

    content = "listData";
    loading = "loadSearch";

    // My API Key
    var myAPIKey = '?api_key=7ce83203cac071b99a03223afe399640';

    // Search call
    var apiSearch = 'https://api.themoviedb.org/3/search/' + searchByThis;

    // Complementary data for search
    var comSearch = '&language=es&page=1&include_adult=false&sort_by=popularity.desc&query=';

    var queryInput = searchtxt.value;

    // Call ajax request
    var url = apiSearch + myAPIKey + comSearch + queryInput;

    callRequest(url);
}

// This function makes the ajax request
function callRequest(url)
{
    // Validate browser
    if (window.XMLHttpRequest)
        req = new XMLHttpRequest();
    else if (window.ActiveXObject) {

        req = new ActiveXObject("Microsoft.XMLHTTP");
    } else {

        req = new ActiveXObject("Msxml2.XMLHTTP");
    }
    req.onreadystatechange = responseReady;
    req.open("GET", url, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(null);

}

// Manipulates the ajax state change
function responseReady() {
    var elemento = document.getElementById(content);
    var elemento2 = document.getElementById(loading);
    if (req.readyState === 1) {
        if (elemento2 !== null) {
            // Loading image rendered
            elemento2.innerHTML = '<img width="24px" height="24px" src="ajax-loader.gif">' +
                    '<font color="green">&nbsp;&nbsp;Loading... please wait</font>';
        }

    } else if (req.readyState === 4) {

        if (req.status === 200) {

            //elemento.innerHTML = req.responseText;
            var text = req.responseText;
            // Get response
            renderResponse(text);

            if (elemento2 !== null) {
                elemento2.innerHTML = "";
            }

        } else if (req.status === 404) {
            elemento2.innerHTML = "";
            elemento.innerHTML = '<font color="red">Address not found.</font>';
        } else {
            elemento2.innerHTML = "";
            elemento.innerHTML = '<font color="red">Error:' + req.status + '.</font>';
        }

    }
}

// Get the json object and render it 
function renderResponse(text) {
    var elemento = document.getElementById(content);

    // Parse json data for javascript
    var jsonParsed = JSON.parse(text);

    var totalResults = jsonParsed.total_results;

    if (totalResults === 0) {
        elemento.innerHTML = '<font color="red">No results... try again....</font>';
    }
    else {
        if (totalResults > resultperPage) {
            resultShown = resultperPage;
        }
        else {
            resultShown = totalResults;
        }
    }

    if (searchByThis === 'person') {
        renderPerson(jsonParsed, resultShown, fields);
    }
    else {
        renderMovie(jsonParsed, resultShown, fields);

    }

}

// Search top 5 most popular person
function renderPerson(obj, fields) {

    var tamn = obj.results.length;

    if (tamn > 5) {
        tamn = 5;
    }
    else {
        tamn = tamn - 1;
    }

    resultShown = tamn;

    for (var p = tamn; p > 0; p--) {

        var tamk = obj.results[p].known_for.length;

        for (var i = 0; i < fields; i++) {
            var table = document.getElementById("myTable");
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            
            var orgTitle = "";
            var regTitle = "";

            if (i === 0) {

                for (var k = 0; k < tamk; k++) {

                    orgTitle += obj.results[p].known_for[k].original_title + ",- ";
                }

                cell1.innerHTML = "&nbsp;&nbsp;Known for: " + orgTitle;
            }
            
            if (i === 1) {
                 cell1.innerHTML = "&nbsp;&nbsp; " ;
            }
            
            if (i === 2) {
                cell1.innerHTML = "&nbsp;&nbsp;Popularity: " + obj.results[p].popularity;
            }

            if (i === 3) {

                cell1.innerHTML = "&nbsp;&nbsp;Name: " + obj.results[p].name;

                var cell2 = row.insertCell(1);

                var posterImg = 'http://image.tmdb.org/t/p/w500' + obj.results[p].profile_path;


                cell2.innerHTML = '<img src="' + posterImg + '" width="200" height="300" alt="Sorry... Image not found">';
                cell2.rowSpan = "4";
            }
        }
    }
}

// Search top 5 most popular movies
function renderMovie(obj, fields) {

    var tam = obj.results.length;

    if (tam > 5) {
        tam = 5;
    }
    else {
        tam = tam - 1;
    }

    resultShown = tam;

    for (var j = tam; j > 0; j--) {

        for (var i = 0; i < fields; i++) {
            var table = document.getElementById("myTable");
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);

            if (i === 0) {
                cell1.innerHTML = "&nbsp;&nbsp;Rating: " + obj.results[j].vote_average;
            }

            if (i === 1) {
                cell1.innerHTML = "&nbsp;&nbsp;Date: " + obj.results[j].release_date;
            }

            if (i === 2) {
                cell1.innerHTML = "&nbsp;&nbsp;Popularity: " + obj.results[j].popularity;
            }

            if (i === 3) {
                cell1.innerHTML = "&nbsp;&nbsp;Original Title: " + obj.results[j].original_title +
                        " <br>&nbsp;&nbsp;( " + obj.results[j].title + " )";

                var cell2 = row.insertCell(1);

                var posterImg = 'http://image.tmdb.org/t/p/w500' + obj.results[j].poster_path;

                cell2.innerHTML = '<img src="' + posterImg + '" width="200" height="300" alt="Sorry... Image not found">';
                cell2.rowSpan = "4";
            }
        }
    }
}

// Delete generated rows
function dropOldData() {

    var rowsCreated = 0;

    try {
        rowsCreated = document.getElementById("myTable").rows.length;

        if (rowsCreated > 1 && rowsCreated !== null) {

            for (var d = 1; d < rowsCreated; d++) {
                document.getElementById("myTable").deleteRow(1);
            }
        }
    } catch (err) {

    }
}
