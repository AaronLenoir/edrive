let url = 'https://spreadsheets.google.com/feeds/cells/16hJ_67ox89L3DuVuc8KWAGMYFwb58rVP2fjCkc2AoGE/1/public/full?alt=json';

var app = new Vue({
  el: '#app',
  data: {
    dataAvailable: false,
    data: {}
  },
  created: function () {
    fetch(url)
    .then(
      function(response) {
          response.json().then(function(data) {
            app.data = data;
            app.dataAvailable = true;
          });
      }
    ).catch((error) => {
      console.error('Error:', error);
    });
  },
  methods: {
    getRows: function () {
      // group by row
      let rows = app.data.feed.entry.reduce((acc, reducer) => {
        let row = acc[reducer.gs$cell.row - 1] || { row: reducer.gs$cell.row, cells: [] };
        row.cells.push(reducer.gs$cell);
        acc[reducer.gs$cell.row - 1] = row;
        return acc;
      }, []);
      
      return rows;
    }
  }
});