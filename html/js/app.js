Vue.component('trip-overview', {
  props: ['rows'],
  template: `
  <table class="pure-table">
    <thead>
      <tr v-for="row in rows.slice(0,1)">
        <th v-if="row.cells[0].row == 1" v-for="cell in row.cells">
          {{ cell.inputValue }}
        </th>
        <td v-if="row.cells[0].row > 1" v-for="cell in row.cells">
          {{ cell.inputValue }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows.slice(1)">
        <th v-if="row.cells[0].row == 1" v-for="cell in row.cells">
          {{ cell.inputValue }}
        </th>
        <td v-if="row.cells[0].row > 1" v-for="cell in row.cells">
          {{ cell.inputValue }}
        </td>
      </tr>
    </tbody>
  </table>
  `
});

var app = new Vue({
  el: '#app',
  data: {
    dataAvailable: false,
    data: {}
  },
  created: function () {
    edriveDataService.fetchData(function (data) {
      app.data = data;
      app.dataAvailable = true;
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