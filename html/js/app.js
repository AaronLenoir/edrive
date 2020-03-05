Vue.component('distance-summary', {
  props: ['analysis'],
  mounted: function () {
    this.loadChart();
  },
  updated: function () {
    this.loadChart();
  },
  methods: {
    loadChart() {
      let data = this.analysis.trips.getTripDistanceSummary([{name: "short", range: [0, 20]}, {name: "medium", range: [20, 80]}, {name: "long", range: [80, 999999]}]);

      let dataPoints = [];
      data.forEach(item => dataPoints.push({name: `${item.name} (${item.description()})`, y: item.count}));

      Highcharts.chart('distance-summary-pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Trips by distance'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: dataPoints
        }]
    });
    }
  },
  template: `
  <div class="chart" id="distance-summary-pie"></div>
`
});

Vue.component('trip-overview', {
  props: ['analysis'],
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
      <th>Trip distance</th>
      <th>Elapsed time</th>
      <th>Average Speed</th>
      <th>Average Temp</th>
      <th>Used battery</th>
      <th>Battery / 100 km</th>
      <th>kWh / 100 km</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="trip in analysis.trips.items">
        <td>{{ trip.startDateTime.getFullYear() }}-{{ trip.startDateTime.getMonth().toString().padStart(2, 0) }}-{{ trip.startDateTime.getDay().toString().padStart(2, 0) }}</td>
        <td>{{ trip.startDateTime.getHours().toString().padStart(2, 0) }}:{{ trip.startDateTime.getMinutes().toString().padStart(2, 0) }}</td>
        <td>{{ trip.startKm.toFixed() }}</td>
        <td>{{ (trip.startCharge * 100).toFixed() }} %</td>
        <td>{{ trip.startTemp.toFixed() }} &deg;C</td>
        <td>{{ trip.endDateTime.getHours().toString().padStart(2, 0) }}:{{ trip.endDateTime.getMinutes().toString().padStart(2, 0) }}</td>
        <td>{{ trip.endKm.toFixed() }}</td>
        <td>{{ (trip.endCharge * 100).toFixed() }} %</td>
        <td>{{ trip.endTemp.toFixed() }} &deg;C</td>
        <td>{{ trip.peopleOnBoard }}</td>
        <td>{{ trip.eco ? "Yes" : "No" }}</td>
        <td>{{ trip.bMode ? "Yes" : "No" }}</td>
        <td>{{ trip.airco ? "Yes" : "No" }}</td>
        <td>{{ trip.highway ? "Yes" : "No" }}</td>
        <td>{{ trip.rain ? "Yes" : "No" }}</td>
        <td>{{ trip.distance }} km</td>
        <td>{{ Math.floor(trip.elapsedTime / 60).toString().padStart(2, 0) }}:{{ Math.floor(trip.elapsedTime % 60).toFixed().toString().padStart(2, 0) }}</td>
        <td>{{ trip.averageSpeed.toFixed() }} km/h</td>
        <td>{{ trip.averageTemp.toFixed(2) }} &deg;C</td>
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