import React, { useState } from 'react';
import { createContext } from 'react';

const latitude = -23.70389
const longitude = -46.61840
const delta = 0.00005

export const initCoordinates = [{
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
}]

export const startPosition = initCoordinates[0]
export const endPosition = initCoordinates[0]

const RondaVigiaContext = createContext({
    startPosition: startPosition,
    endPosition: endPosition,
    coordinates: initCoordinates,
})

export const RondaVigiaContextProvider = ({ children }) => {
    // useEffect(() => {
    //     _BackgroundTimer.setInterval(() => {
    //         console.info('useeffect')
    //         if (Math.random() > 0.5) {
    //             latitude += delta
    //         }
    //         else {
    //             longitude += delta
    //         }
    //         var currPosistion = {
    //             latitude: latitude,
    //             longitude: longitude,
    //             latitudeDelta: 0.001,
    //             longitudeDelta: 0.001,
    //         }
    //         setCoordinates([...coordinates, currPosistion])
    //     }, 2000)
    // }, [])


    return (
        <RondaVigiaContext.Provider value={{
            startPosition: startPosition,
            endPosition: endPosition,
            coordinates: initCoordinates
        }} >
            {children}
        </RondaVigiaContext.Provider>
    )
}

export default RondaVigiaContext