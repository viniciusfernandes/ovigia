import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import _BackgroundTimer from 'react-native-background-timer';
import { set } from 'react-native-reanimated';


const RondaVigiaContext = createContext({})

export const RondaVigiaContextProvider = ({ children }) => {
    console.info('RondaVigiaContextProvider init')
    const latitude = -23.70389
    const longitude = -46.61840
    const delta = 0.00005

    var coordinates = []

    const [rondaIniciada, setRondaIniciada] = useState(false)
    const iniciarRonda = () => {
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
            5000);
    }

    const pausarRonda = () => {
        Geolocation.stopObserving()
    }

    useEffect(() => {
        console.info('useEffect')
        iniciarRonda()
        if (rondaIniciada) {
            iniciarRonda()
        } else {
            pausarRonda()
        }

    }, [rondaIniciada])

    console.info('RondaVigiaContextProvider end')

    return (
        <RondaVigiaContext.Provider value={{
            startPosition: coordinates[0],
            endPosition: coordinates[coordinates.length - 1],
            coordinates: coordinates,
            rondaIniciada: rondaIniciada,
            iniciarRonda: () => setRondaIniciada(true),
            pausarRonda: () => setRondaIniciada(false)
        }} >
            {children}
        </RondaVigiaContext.Provider>
    )
}

export default RondaVigiaContext