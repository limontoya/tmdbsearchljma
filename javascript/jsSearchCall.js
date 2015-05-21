
// Global vars
var searchtxt = '';
// global var to set the first tab to show
var showFirstTab = -1;
var movieResQuant = 0;
var peopleResQuant = 0;

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

        //Search!
        callRequestMovies(urlMovie);
        setTimeout(callRequestPeople(urlPeople), 1000);
        
    }
    else {
        document.getElementById("errorSearchCall").innerHTML = 'Please enter a query';
    }

}

// If clicks on tab, show the original display and background
function resetStyle(miID) {

    var str = "" + miID;
    var rest = str.substring(3, 4);

    // then set selected tab
    switch (rest) {
        case 1:
            //reset all
            document.getElementById('tab2a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab2a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab2a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab2a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab2a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab2').style.display = "none";
            document.getElementById('tab2a').style.display = "block";
            document.getElementById('tab3a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab3a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab3a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab3a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab3a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab3').style.display = "none";
            document.getElementById('tab3a').style.display = "block";
            document.getElementById('tab4a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab4a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab4a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab4a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab4a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab4').style.display = "none";
            document.getElementById('tab4a').style.display = "block";
            
            // show current
            document.getElementById('tab1a').style.backgroundColor = "#ffffff";
            document.getElementById('tab1a').style.borderBottom = "1px solid #ffffff";
            document.getElementById('tab1a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab1a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab1a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab1').style.display  = "block";
            document.getElementById('tab1a').style.display = "block";
            break;
        case 2:
            //reset all
            document.getElementById('tab1a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab1a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab1a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab1a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab1a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab1').style.display = "none";
            document.getElementById('tab1a').style.display = "block";
            document.getElementById('tab3a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab3a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab3a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab3a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab3a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab3').style.display = "none";
            document.getElementById('tab3a').style.display = "block";
            document.getElementById('tab4a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab4a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab4a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab4a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab4a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab4').style.display = "none";
            document.getElementById('tab4a').style.display = "block";
            
            // show current
            document.getElementById('tab2a').style.backgroundColor = "#ffffff";
            document.getElementById('tab2a').style.borderBottom = "1px solid #ffffff";
            document.getElementById('tab2a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab2a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab2a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab2').style.display  = "block";
            document.getElementById('tab2a').style.display = "block";
            break;
        case 3:
            //reset all
            document.getElementById('tab1a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab1a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab1a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab1a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab1a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab1').style.display = "none";
            document.getElementById('tab1a').style.display = "block";
            document.getElementById('tab2a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab2a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab2a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab2a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab2a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab2').style.display = "none";
            document.getElementById('tab2a').style.display = "block";
            document.getElementById('tab4a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab4a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab4a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab4a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab4a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab4').style.display = "none";
            document.getElementById('tab4a').style.display = "block";
            
            // show current
            document.getElementById('tab3a').style.backgroundColor = "#ffffff";
            document.getElementById('tab3a').style.borderBottom = "1px solid #ffffff";
            document.getElementById('tab3a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab3a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab3a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab3').style.display  = "block";
            document.getElementById('tab3a').style.display = "block";
            break;
        case  4:
            //reset all
            document.getElementById('tab1a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab1a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab1a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab1a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab1a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab1').style.display = "none";
            document.getElementById('tab1a').style.display = "block";
            document.getElementById('tab2a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab2a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab2a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab2a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab2a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab2').style.display = "none";
            document.getElementById('tab2a').style.display = "block";
            document.getElementById('tab3a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab3a').style.borderBottom = "1px solid #e5e5e5";
            document.getElementById('tab3a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab3a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab3a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab3').style.display = "none";
            document.getElementById('tab3a').style.display = "block";
            
            // show current
            document.getElementById('tab4a').style.backgroundColor = "#ffffff";
            document.getElementById('tab4a').style.borderBottom = "1px solid #ffffff";
            document.getElementById('tab4a').style.webkitboxShadow = "none";//-webkit-box-shadow: none;
            document.getElementById('tab4a').style.mozboxShadow =  "none";//-moz-box-shadow: none;
            document.getElementById('tab4a').style.boxShadow =  "none";//box-shadow: none;
            document.getElementById('tab4').style.display  = "block";
            document.getElementById('tab4a').style.display = "block";
            break;
    }

}

function setFirstTab (){
    
    //set the first tab:
        showFirstTab = movieResQuant >= peopleResQuant ? 0 : 1;
        //document.getElementById('start').style.display = "none";
        //alert(showFirstTab + 'mov = '+ movieResQuant + ' - ppl =' + peopleResQuant); //http://tmdbsearchljma.appspot.com
        
        // Show People
        if (showFirstTab === 1) {
            document.getElementById('tab3').style.display = "none";
            document.getElementById('tab3a').style.display = "none";
            document.getElementById('tab3a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab3a').style.borderBottom = "1px solid #e5e5e5";
            
            document.getElementById('tab4').style.display = "none";
            document.getElementById('tab4a').style.display = "none";
            document.getElementById('tab4a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab4a').style.borderBottom = "1px solid #e5e5e5";
            
            document.getElementById('tab1').style.display = "none";
            document.getElementById('tab1a').style.display = "block";
            document.getElementById('tab1a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab1a').style.borderBottom = "1px solid #e5e5e5";
            
            document.getElementById('tab2a').style.display = "block";
            document.getElementById('tab2a').style.backgroundColor = "#ffffff";
            document.getElementById('tab2').style.display  = "block";
            document.getElementById('tab2a').style.borderBottom = "1px solid #ffffff";
        }
        else { // Show Movies
            document.getElementById('tab3').style.display = "none";
            document.getElementById('tab3a').style.display = "none";
            document.getElementById('tab3a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab3a').style.borderBottom = "1px solid #e5e5e5";
            
            document.getElementById('tab4').style.display = "none";
            document.getElementById('tab4a').style.display = "none";
            document.getElementById('tab4a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab4a').style.borderBottom = "1px solid #e5e5e5";
            
            document.getElementById('tab2').style.display = "none";
            document.getElementById('tab2a').style.display = "block";
            document.getElementById('tab2a').style.backgroundColor = "#f5f5f5";
            document.getElementById('tab2a').style.borderBottom = "1px solid #e5e5e5";
            
            document.getElementById('tab1a').style.display = "block";
            document.getElementById('tab1a').style.backgroundColor = "#ffffff";
            document.getElementById('tab1').style.display  = "block";
            document.getElementById('tab1a').style.borderBottom = "1px solid #ffffff";
        }
}
