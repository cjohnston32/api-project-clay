localStorage.index = '0'; // To keep track of what page of results user is on, !(<0)

// apiHandler() - handles API data
/**
 * @param {object} npAPI
 */
function newPage(npAPI) {
    // API Variables
    var numResults = npAPI.total_results;
    console.log(numResults)

    // Iteration Stuff
    var indexStart = parseInt(localStorage.index);  // indexStart always a mutliple of 10
    var indexEnd = indexStart + 9;
    var indexLength = indexEnd.toString().length; // Length of string of index
    console.log(indexStart);
};

$(document).ready(function() {
    // To enable CORS
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    // Get URL from npIndex.js and do AJAX request
        var searchURL = localStorage.apiURL;
        $.ajax({
            url: searchURL,
            method: 'GET'
        }).then(newPage)
        .catch(function(err) {alert('error:' + err.message);})
        console.log(localStorage.apiURL);

    // When user presses next page button
    $('#nextNp').on('click', function(event) {
        var indexStart = parseInt(localStorage.index);
        localStorage.index = indexStart += 10;
        newPage;
    });

    // When user presses previous page button
    $('#prevNp').on('click', function(event) {
        var indexStart = parseInt(localStorage.index);
        if (indexStart === 0) {
            // Cannot go before first page error
        }
        else {
            localStorage.index = indexStart -= 10;
            newPage;
        }
    });
})

// PROBLEMS
    // 1) How to store object of all organizations for when
        // The user presses next/prev buttons we can get a new list of 10 organizations