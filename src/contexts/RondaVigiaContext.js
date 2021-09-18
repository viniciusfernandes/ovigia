import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import _BackgroundTimer from 'react-native-background-timer';

const RondaVigiaContext = createContext({})
const RONDA_STATUS = {
    INICIADA: 'iniciada',
    PAUSADA: 'pausada',
    ENCERRADA: 'encerrada',
    isEncerrada: status => { return RONDA_STATUS.ENCERRADA == status },
    isPausaPermitida: status => { return RONDA_STATUS.INICIADA == status },
    isInicioPermitido: status => { return RONDA_STATUS.PAUSADA == status }

}
export const RondaVigiaContextProvider = ({ children }) => {
    console.info('RondaVigiaContextProvider init')
    const latitude = -23.70389
    const longitude = -46.61840
    const delta = 0.00005

    var coordinates = []

    const [rondaStatus, setRondaStatus] = useState(RONDA_STATUS.ENCERRADA)
    const iniciarRonda = () => {
        console.info('iniciando ronda')
        _BackgroundTimer.runBackgroundTimer(() => {
            Geolocation.getCurrentPosition(
                position => {

                    var currPosistion = {
                        latitude: Math.random() > 0.5 ? latitude + delta : latitude - delta,
                        longitude: Math.random() > 0.5 ? longitude - delta : longitude + delta,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }

                    coordinates.push(currPosistion)
                    console.info('coordinates size: ' + coordinates.length)
                },
                error => console.error(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            )
        },
            2000);
    }

    const pausarRonda = () => {
        console.info('pausando ronda')
        Geolocation.stopObserving()
    }


    const encerrarRonda = () => {
        console.info('encerrando ronda')
        coordinates = []
        pausarRonda()
    }

    useEffect(() => {
        if (RONDA_STATUS.isInicioPermitido(rondaStatus)) {
            iniciarRonda()
        } else if (RONDA_STATUS.isPausaPermitida(rondaStatus)) {
            pausarRonda()
        } else {
            encerrarRonda()
        }

    }, [rondaStatus])

    console.info('RondaVigiaContextProvider end')

    return (
        <RondaVigiaContext.Provider value={{
            startPosition: coordinates[0],
            endPosition: coordinates[coordinates.length - 1],
            coordinates: coordinates,
            rondaIniciada: RONDA_STATUS.isPausaPermitida(rondaStatus),
            iniciarRonda: () => setRondaStatus(RONDA_STATUS.INICIADA),
            pausarRonda: () => setRondaStatus(RONDA_STATUS.PAUSADA),
            encerrarRonda: () => encerrarRonda()
        }} >
            {children}
        </RondaVigiaContext.Provider>
    )
}

export default RondaVigiaContext