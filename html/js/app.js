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
      <th>Trip distance (km)</th>
      <th>Elapsed time (min)</th>
      <th>Avg Speed (km/h)</th>
      <th>Avg Temp</th>
      <th>Used battery</th>
      <th>Battery / 100 km</th>
      <th>kWh / 100 km</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="trip in trips.items">
        <td>{{ trip.startDateTime.toDateString() }}</td>
        <td>{{ trip.startDateTime.toTimeString() }}</td>
        <td>{{ trip.startKm.toFixed() }}</td>
        <td>{{ (trip.startCharge * 100).toFixed() }} %</td>
        <td>{{ trip.startTemp.toFixed() }} &deg;C</td>
        <td>{{ trip.endDateTime.toTimeString() }}</td>
        <td>{{ trip.endKm.toFixed() }}</td>
        <td>{{ (trip.endCharge * 100).toFixed() }} %</td>
        <td>{{ trip.endTemp.toFixed() }} &deg;C</td>
        <td>{{ trip.peopleOnBoard }}</td>
        <td>{{ trip.eco ? "Yes" : "No" }}</td>
        <td>{{ trip.bMode ? "Yes" : "No" }}</td>
        <td>{{ trip.airco ? "Yes" : "No" }}</td>
        <td>{{ trip.highway ? "Yes" : "No" }}</td>
        <td>{{ trip.rain ? "Yes" : "No" }}</td>
        <td>{{ trip.distance }}</td>
        <td>{{ trip.elapsedTime }}</td>
        <td>{{ trip.averageSpeed.toFixed() }}</td>
        <td>{{ trip.averageTemp }} &deg;C</td>
        <td>{{ (trip.usedBattery *100).toFixed() }} %</td>
        <td>{{ (trip.batteryPer100Km * 100).toFixed() }} %</td>
        <td>{{ (trip.kWhPer100Km * 100).toFixed() }}</td>
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