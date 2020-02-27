class Trip {
    constructor(rawDataRow, columnIndexes) {
        // Todo: parse according to type ...
        this.date = rawDataRow.cells[columnIndexes["Date"]].inputValue;
        this.startTime = rawDataRow.cells[columnIndexes["Start time"]].inputValue;
        this.startKm = rawDataRow.cells[columnIndexes["Start km"]].inputValue;
        this.startCharge = rawDataRow.cells[columnIndexes["Start charge"]].inputValue;
        this.startTemp = rawDataRow.cells[columnIndexes["Start temp"]].inputValue;
        this.endTime = rawDataRow.cells[columnIndexes["End Time"]].inputValue;
        this.endKm = rawDataRow.cells[columnIndexes["End km"]].inputValue;
        this.endCharge = rawDataRow.cells[columnIndexes["End charge"]].inputValue;
        this.endTemp = rawDataRow.cells[columnIndexes["End temp"]].inputValue;
        this.peopleOnBoard = rawDataRow.cells[columnIndexes["POB"]].inputValue;
        this.bMode = rawDataRow.cells[columnIndexes["B-mode"]].inputValue;
        this.eco = rawDataRow.cells[columnIndexes["Eco"]].inputValue;
        this.airco = rawDataRow.cells[columnIndexes["Airco"]].inputValue;
        this.highway = rawDataRow.cells[columnIndexes["Highway"]].inputValue;
        this.rain = rawDataRow.cells[columnIndexes["Rain"]].inputValue;
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