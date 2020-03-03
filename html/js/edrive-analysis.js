class Trip {
    constructor(rawDataRow, columnIndexes) {
        this.startDateTime = this.parseDateTime(rawDataRow.cells[columnIndexes["Date"]].inputValue, rawDataRow.cells[columnIndexes["Start time"]].numericValue);
        this.startKm = Number(rawDataRow.cells[columnIndexes["Start km"]].numericValue);
        this.startCharge = Number(rawDataRow.cells[columnIndexes["Start charge"]].numericValue);
        this.startTemp = Number(rawDataRow.cells[columnIndexes["Start temp"]].numericValue);
        this.endDateTime = this.parseDateTime(rawDataRow.cells[columnIndexes["Date"]].inputValue, rawDataRow.cells[columnIndexes["End Time"]].numericValue);
        this.endKm = Number(rawDataRow.cells[columnIndexes["End km"]].numericValue);
        this.endCharge = Number(rawDataRow.cells[columnIndexes["End charge"]].numericValue);
        this.endTemp = Number(rawDataRow.cells[columnIndexes["End temp"]].numericValue);
        this.peopleOnBoard = Number(rawDataRow.cells[columnIndexes["POB"]].numericValue);
        this.bMode = rawDataRow.cells[columnIndexes["B-mode"]].inputValue === "Yes" ? true : false;
        this.eco = rawDataRow.cells[columnIndexes["Eco"]].inputValue === "Yes" ? true : false;
        this.airco = rawDataRow.cells[columnIndexes["Airco"]].inputValue === "Yes" ? true : false;
        this.highway = rawDataRow.cells[columnIndexes["Highway"]].inputValue === "Yes" ? true : false;
        this.rain = rawDataRow.cells[columnIndexes["Rain"]].inputValue === "Yes" ? true : false;

        this.distance = this.endKm - this.startKm;
        this.elapsedTime = (this.endDateTime.getHours() * 60 + this.endDateTime.getMinutes()) - (this.startDateTime.getHours() * 60 + this.startDateTime.getMinutes());
        this.averageSpeed = (this.distance / this.elapsedTime) * 60;
        this.averageTemp = (this.startTemp + this.endTemp) / 2;
        this.usedBattery = this.startCharge - this.endCharge;
        this.batteryPer100Km = (this.usedBattery / this.distance) * 100;
        this.kWhPer100Km = this.batteryPer100Km * 0.56;
    }

    parseDateTime(dateString, timeValue) {
        let splitDate = dateString.split("-");
        let hours = Math.floor(24*timeValue);
        let minutes = 60 * ((24*timeValue)%1);
        return new Date(splitDate[0], splitDate[1], splitDate[2], hours, minutes);
    }
}

class TripCollection {
    constructor(rawData) {
        this.items = [];
        this.loadTripsFromRawData(rawData);
    }

    add(trip) {
        // Todo: perform running analysis
        this.items.push(trip);
    }

    loadTripsFromRawData(rawData) {
        let result = [];

        let rows = app.data.feed.entry.reduce((acc, reducer) => {
            let row = acc[reducer.gs$cell.row - 1] || { row: reducer.gs$cell.row, cells: [] };
            row.cells.push(reducer.gs$cell);
            acc[reducer.gs$cell.row - 1] = row;
            return acc;
        }, []);

        let headerRow = rows[0];
        let columnIndexes = this.getColumnIndexes(headerRow);

        rows.slice(1).forEach(row => this.add(new Trip(row, columnIndexes)));

        console.log(result);
        return result;
    }

    getColumnIndexes(headerRow) {
        return {
            "Date": headerRow.cells.findIndex(cell => cell.inputValue === "Date"),
            "Start time": headerRow.cells.findIndex(cell => cell.inputValue === "Start time"),
            "Start km": headerRow.cells.findIndex(cell => cell.inputValue === "Start km"),
            "Start charge": headerRow.cells.findIndex(cell => cell.inputValue === "Start charge"),
            "Start temp": headerRow.cells.findIndex(cell => cell.inputValue === "Start temp"),
            "End Time": headerRow.cells.findIndex(cell => cell.inputValue === "End Time"),
            "End km": headerRow.cells.findIndex(cell => cell.inputValue === "End km"),
            "End charge": headerRow.cells.findIndex(cell => cell.inputValue === "End charge"),
            "End temp": headerRow.cells.findIndex(cell => cell.inputValue === "End temp"),
            "POB": headerRow.cells.findIndex(cell => cell.inputValue === "POB"),
            "Eco": headerRow.cells.findIndex(cell => cell.inputValue === "Eco"),
            "B-mode": headerRow.cells.findIndex(cell => cell.inputValue === "B-mode"),
            "Airco": headerRow.cells.findIndex(cell => cell.inputValue === "Airco"),
            "Highway": headerRow.cells.findIndex(cell => cell.inputValue === "Highway"),
            "Rain": headerRow.cells.findIndex(cell => cell.inputValue === "Rain")
        }
    }
}

class EdriveAnalysis {
    constructor(data) {
        this.rawData = data;
        this._trips = null;
    }

    get trips() {
        if (this._trips == null) {
            this._trips = new TripCollection(this.rawData);
        }
        return this._trips;
    }
}