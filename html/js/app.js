Vue.component('trip-overview', {
  props: ['trips'],
  template: `
  <table class="pure-table">
    <thead>
      <tr>
      <th>Date</th>
      <th>Start time</th>
      <th>Start km</th>
      <th>Start charge</th>
      <th>Start temp</th>
      <th>End Time</th>
      <th>End km</th>
      <th>End charge</th>
      <th>End temp</th>
      <th>POB</th>
      <th>Eco</th>
      <th>B-mode</th>
      <th>Airco</th>
      <th>Highway</th>
      <th>Rain</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="trip in trips.items">
        <td>{{ trip.date }}</td>
        <td>{{ trip.startTime }}</td>
        <td>{{ trip.startKm }}</td>
        <td>{{ trip.startCharge }}</td>
        <td>{{ trip.startTemp }}</td>
        <td>{{ trip.endTime }}</td>
        <td>{{ trip.endKm }}</td>
        <td>{{ trip.endCharge }}</td>
        <td>{{ trip.endTemp }}</td>
        <td>{{ trip.peopleOnBoard }}</td>
        <td>{{ trip.eco }}</td>
        <td>{{ trip.bMode }}</td>
        <td>{{ trip.airco }}</td>
        <td>{{ trip.highway }}</td>
        <td>{{ trip.rain }}</td>
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
      app.analysis = new EdriveAnalysis(data);
      app.dataAvailable = true;
    });
  }
});