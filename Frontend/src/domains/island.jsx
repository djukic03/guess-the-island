export class Island {
    constructor(coordinates, avgHeight) {
        this.coordinates = coordinates;
        this.avgHeight = avgHeight;
    }

    get coordinates() {
        return this.coordinates;
    }

    set coordinates(coordinates) {
        this.coordinates = coordinates;
    }

    get avgHeight() {
        return this.avgHeight;
    }

    set avgHeight(avgHeight) {
        this.avgHeight = avgHeight;
    }
}