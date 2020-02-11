let url = 'https://spreadsheets.google.com/feeds/cells/16hJ_67ox89L3DuVuc8KWAGMYFwb58rVP2fjCkc2AoGE/1/public/full?alt=json';

fetch(url)
  .then(
    function(response) {
        response.json().then(function(data) {
          console.log(data);
        });
    }
  );
 
document.write('Hello world!');