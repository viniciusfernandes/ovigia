import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity, View,
    Image, Dimensions
} from 'react-native';
import Medidas from './constantes/medidas/Medidas';
import matisse from './style/matisse';

const diameter = 150
const borda = 5
const diameterMenor = diameter - 2 * borda
const radius = diameter / 2 + borda
const radiusMenor = radius - borda
const init = (Medidas.larguraMaxima - diameter) / 2

const isTablet = Medidas.isTablet


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: matisse.laranja,
    },
    nome: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: isTablet ? 35 : 25,
    },
    cidade: {
        color: '#C3C9C9',
        fontSize: isTablet ? 30 : 20,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

})

export default props => {
    return (
        <>
            <View style={{
                position: 'absolute', left: init, top: -radius,
                width: diameter, height: diameter,
                backgroundColor: 'white',
                borderWidth: borda,
                borderColor: 'white',
                borderRadius: radius,
            }}>
                <Image
                    style={{ width: diameterMenor, height: diameterMenor, borderRadius: radiusMenor }}
                    source={ require('../images/perfil-vinicius.jpg')}
                />
                <View style={{
                    position: 'absolute', width: 50, height: 50,
                    backgroundColor: 'white', borderRadius: 25, left: 100, top: 100
                }}>
                    <TouchableOpacity >
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                            source={require('../images/camera_laranja_75.png')}
                        />
                    </TouchableOpacity>
                </View>

            </View>
            <View>

                <Text style={styles.nome}>Vinicius Fernandes</Text>
                <Text style={styles.cidade}>São Paulo/SP</Text>
            </View>
        </>
    )
}