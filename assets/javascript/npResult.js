var index = 0; // To keep track of what page of results user is on, !(<0)
var orgArray;
var numOrgs;

function updatePage() {
    var indexEnd = index + 9;
    var elementNum = 0; // 0-9
    for (index; index<=indexEnd; index++) {
        // --- Indexing Updates ---
        elementNum = elementNum.toString();
        var npDiv = 'np' + elementNum; // ID of div for a single non-profit. Range: np0-np9
        elementNum = parseInt(elementNum) + 1; // Updates elementNum for next iteration

        // --- Grabbing API Data ---
        orgName = orgArray[index].name;

        // --- Assigning HTML Elements to Variables ---
        var npMainEle = document.getElementById(npDiv);
        
        // --- Changing HTML --- 
        npMainEle.innerHTML = orgName;
    }
};

// apiHandler() - handles API data
/**
 * @param {object} npAPI
 */
function apiHandler(npAPI) {
    orgArray = npAPI.organizations;
    numOrgs = npAPI.total_results;
    updatePage();
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
        }).then(apiHandler)
        .catch(function(err) {alert('error:' + err.message);})
        console.log(localStorage.apiURL);

    // When user presses next page button
    $('#nextNp').on('click', function(event) {
        index += 10;
        updatePage();
    });

    // When user presses previous page button
    $('#prevNp').on('click', function(event) {
        if (index === 0) {
            // Cannot go before first page error
        }
        else {
            index -= 10;
            updatePage();
        }  
    });
})