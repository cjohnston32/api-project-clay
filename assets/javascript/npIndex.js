

// makeSearch() - makes the search URL for np API call on npResult.js
/**
 * @returns {string}
 */
function makeSearch() {
    var searchURL = 'https://projects.propublica.org/nonprofits/api/v2/search.json';
    // Space remover and '+' additions for URL encoding required by nonprofit API
    userInput = localStorage.userInputData ; // With added similar keywords/hashtags
    searchURL += '?q=' + userInput;
    localStorage.apiURL = searchURL;
};


// makeHashtagSearch() - Creates URL for accessing RiteKit API
/**
 * @returns {string}
 */
function makeHashtagSearch() { // Creates URL for accessing RiteKit API
    var apiURL = 'https://api.ritekit.com/v1/stats/hashtag-suggestions/';
    var clientId = '?client_id=6b3e9139f544560039e01f0a4b40b8ebd9b5107ad0b1';
    var userInput = $('#subject').val().trim();
    localStorage.userInputData = userInput;
    userInput = userInput.replace(/ /g,'');
    apiURL += userInput += clientId;
    console.log(apiURL);
    return apiURL;
};

// hashtagHandler - Accesses RiteKit API data for similar hashtags
/** 
 * @returns {object}
 */
function hashtagHandler (hashAPI) {
    var htNameArray;
    hashArray = hashAPI.data;
    console.log(hashArray);
    for (var x=0; x<hashArray.length-1; x++) {
        var hashtagName = hashArray[x].hashtag;
        htNameArray[x] = hashtagName;
    }
    console.log(htNameArray)
};

$(document).ready(function() {
    // To enable CORS
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    // To run AJAX call for riteKit API and to change page with URL ready for np API
    $('#submit').on('click', function () {
        var hashURL = makeHashtagSearch();
        $.ajax({
            url: hashURL,
            method: 'GET'
        }).then(hashtagHandler).then(makeSearch)
        setTimeout(function() {
            window.location.href = 'results.html'; // Changes page to results
        }, 100000);
    });
})