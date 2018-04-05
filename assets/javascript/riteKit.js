/** JS file for RiteKit API
 *  Widens searh results using similar hashtags
 */

/**
 * @returns {string}
 */
function makeHashtagSearch() { // Creates URL for accessing RiteKit API
    var apiURL = 'https://api.ritekit.com/v1/stats/hashtag-suggestions/';
    var clientId = '?client_id=6b3e9139f544560039e01f0a4b40b8ebd9b5107ad0b1';
    var userInput = localStorage.userInputData;
    userInput = userInput.replace(/ /g,'');
    apiURL += userInput += clientId;
    return apiURL;
};

/** 
 * @returns {object}
 */
function hashtagHandler (hashAPI) {  // Accesses RiteKit API data for similar hashtags
    console.log(hashAPI.data)
};

$(document).ready(function() {
    // To enable CORS
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    // To access similar hashtags from API
    $('#submit').on('click', function () {
        var hashURL = makeHashtagSearch();
        $.ajax({
            url: hashURL,
            method: 'GET'
        }).then(hashtagHandler);
        setTimeout(function() {
            window.location.href = 'results.html'; // Changes page to results
        }, 10000);
    });
})