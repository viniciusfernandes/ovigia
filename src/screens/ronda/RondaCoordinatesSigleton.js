import Geolocation from "@react-native-community/geolocation"
import _BackgroundTimer from "react-native-background-timer"

class RondaCoordinatesSingleton {

    constructor() {
        this.coordinates = []
        this.rondaIniciada = false
        this.timerId = null
        this.timerDelay = 3000
    }

    getCoordinates = () => {
        return this.coordinates
    }

    iniciarRonda = onGetLocation => {
        // console.info('iniciar ronda: ' + this.timerId + ' data: ' + new Date())
        this.rondaIniciada = true
        const delta = 0.00010

        if (this.timerId !== null) {
            // console.info('limpando o timer: ' + this.timerId + ' data: ' + new Date())
            _BackgroundTimer.clearInterval(this.timerId)
        }

        this.timerId = _BackgroundTimer.setInterval(() => {
            // console.info('executando o timer: ' + this.timerId + ' data: ' + new Date())
            Geolocation.getCurrentPosition(
                position => {
                    var coords = position.coords
                    this.coordinates.push({
                        timestamp: new Date().getTime(),
                        // latitude: Math.random() > 0.5 ? coords.latitude + delta : coords.latitude - delta,
                        // longitude: Math.random() > 0.5 ? coords.longitude - delta : coords.longitude + delta,
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.00000001,
                        longitudeDelta: 0.00000001,
                        velocidade: coords.speed
                    })
                    onGetLocation(this.coordinates)
                },
                error => console.error(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            )
        },
            this.timerDelay);
    }

    pausarRonda = callback => {
        this.rondaIniciada = false
        _BackgroundTimer.clearInterval(this.timerId)
        this.timerId = null
        callback()
        console.info('pausar ronda: ' + this.timerId + ' data: ' + new Date())
    }

    encerrarRonda = callback => {
        this.coordinates = []
        _BackgroundTimer.clearInterval(this.timerId)
        this.timerId = null
        this.rondaIniciada = false
        callback()
        console.info('encerrar ronda: ' + this.timerId + ' data: ' + new Date())
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