import Geolocation from "@react-native-community/geolocation"
import _BackgroundTimer from "react-native-background-timer"

class RondaCoordinatesSingleton {

    constructor() {
        this.instance = null
        this.coordinates = []
        this.rondaIniciada = false
        this.callbacks = []
    }

    getCoordinates = () => {
        return this.coordinates
    }

    iniciarRonda = (callback) => {
        if (callback !== undefined) {
            this.callbacks.push(callback)
        }

        this.rondaIniciada = true
        const delta = 0.00020

        _BackgroundTimer.runBackgroundTimer(() => {
            Geolocation.getCurrentPosition(
                position => {
                    var coords = position.coords
                    this.coordinates.push({
                        timestamp: new Date().getTime(),
                        latitude: Math.random() > 0.5 ? coords.latitude + delta : coords.latitude - delta,
                        longitude: Math.random() > 0.5 ? coords.longitude - delta : coords.longitude + delta,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                        velocidade: coords.speed
                    })
                    if (this.callbacks.length > 0) {
                        this.callbacks.forEach(call => call(this.coordinates))
                    }

                },
                error => console.error(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            )
        },
            500);
    }

    pausarRonda = () => {
        this.rondaIniciada = false
        _BackgroundTimer.stopBackgroundTimer()
    }

    encerrarRonda = callback => {
        this.coordinates = []
        _BackgroundTimer.stopBackgroundTimer()
        if (callback != undefined) {
            callback()
        }
    }

    obterDataInicioRonda() {
        if (this.coordinates.length > 0) {
            return this.coordinates[0].timestamp
        }
        return null
    }

    obterDataFimRonda() {
        if (this.coordinates.length > 0) {
            return this.coordinates[this.coordinates.length - 1].timestamp
        }
        return null
    }


}
export default new RondaCoordinatesSingleton()