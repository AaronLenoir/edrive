let url = 'https://spreadsheets.google.com/feeds/cells/16hJ_67ox89L3DuVuc8KWAGMYFwb58rVP2fjCkc2AoGE/1/public/full?alt=json';﻿

let edriveDataService = (function () {
    let fetchData = function (callback) {
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                callback(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });;
    };

    return {
        fetchData: fetchData
    };
}());