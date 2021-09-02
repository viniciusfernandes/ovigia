// import 'react-native-gesture-handler'
// import React, { useContext } from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import Routes from './routes/Routes'
// import AuthContext, { AuthContextProvider } from './contexts/AuthContext'
// export default () => {
//   const { signed } = useContext(AuthContext)
//   return (
//     <NavigationContainer >
//       <AuthContextProvider value={signed}>
//         <Routes />
//       </AuthContextProvider>
//     </NavigationContainer>
//   )
// }

import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   flex: 1,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default () => (
   <View style={styles.container}>
     <MapView
       style={styles.map}
       region={{
         latitude: -23.70389,
         longitude: -46.61829,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
);