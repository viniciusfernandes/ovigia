import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import _BackgroundTimer from 'react-native-background-timer';
 

const RondaVigiaContext = createContext({ })

export const RondaVigiaContextProvider = ({ children }) => {
    console.info('RondaVigiaContextProvider init')
    const latitude = -23.70389
    const longitude = -46.61840
    const delta = 0.00005

    const [coordinates, setCoordinates] = useState([{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    }])


    useEffect(() => {
        console.info('useeffect')

        _BackgroundTimer.runBackgroundTimer(() => {
            Geolocation.getCurrentPosition(
                position => {

                    var currPosistion = {
                        latitude: Math.random() > 0.5 ? latitude + delta : latitude - delta,
                        longitude: Math.random() > 0.5 ? longitude - delta : longitude + delta,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }
                    setCoordinates([...coordinates, currPosistion])
                    // coordinates.push(currPosistion)
                    console.info('coordinates size: ' +  coordinates.length)
                },
                error => console.error(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            )
        },
            3000);

    }, [])


    console.info('RondaVigiaContextProvider end')

    return (
        <RondaVigiaContext.Provider value={{
            startPosition: coordinates[0],
            endPosition: coordinates[coordinates.length - 1],
            coordinates: coordinates,
            addCoordinate: newCoordinate => { setCoordinates([...coordinates, newCoordinate]) }
        }} >
            {children}
        </RondaVigiaContext.Provider>
    )
}

export default RondaVigiaContext