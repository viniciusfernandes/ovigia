import { throwStatement } from "@babel/types"
import Geolocation from "@react-native-community/geolocation"
import _BackgroundTimer from "react-native-background-timer"
import { call } from "react-native-reanimated"

class RondaCoordinatesSingleton {

    constructor() {
        this.instance = null
        this.coordinates = []
        this.rondaIniciada = false
        this.callbacks = []
        console.info('criando RondaCoordinatesSingleton ')
    }

    getCoordinates = () => {
        return this.coordinates
    }

    iniciarRonda = (callback) => {
        if (callback !== undefined) {
            this.callbacks.push(callback)
        }

        this.rondaIniciada = true
        const delta = 0.00005
        _BackgroundTimer.runBackgroundTimer(() => {
            Geolocation.getCurrentPosition(
                position => {
                    var coords = position.coords

                    this.coordinates.push({
                        latitude: Math.random() > 0.5 ? coords.latitude + delta : coords.latitude - delta,
                        longitude: Math.random() > 0.5 ? coords.longitude - delta : coords.longitude + delta,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    })
                    console.info('coords size: ' + this.coordinates.length)

                    if (this.callbacks.length > 0) {
                        this.callbacks.forEach(call => call(this.coordinates))
                    }

                },
                error => console.error(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            )
        },
            4000);
    }

    pausarRonda = () => {
        this.rondaIniciada = false
        _BackgroundTimer.stopBackgroundTimer()
    }

    encerrarRonda = () => {
        coordinates = []
        _BackgroundTimer.stopBackgroundTimer()
    }


}
export default new RondaCoordinatesSingleton()