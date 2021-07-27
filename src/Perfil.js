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
                    source={{
                        uri: 'https://scontent.fcgh3-1.fna.fbcdn.net/v/t1.6435-1/p320x320/207600281_4194372680609413_4216023978283777792_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeFqf-Mt9YCd9L7XHu9zD3_G9Mq99Rd1S370yr31F3VLfurd-412xZFK6gr5jcikopNyIeakuGcYh6sSHJtqlxKw&_nc_ohc=I4OSTiJPDjMAX97LmKc&_nc_ht=scontent.fcgh3-1.fna&oh=d5793c23da9b2c5b25cf677da8cd94a4&oe=60FA5568',
                    }}
                />
                <View style={{
                    position: 'absolute', width: 50, height: 50,
                    backgroundColor: 'white', borderRadius: 25, left: 100, top: 100
                }}>
                    <TouchableOpacity >
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                            source={{
                                uri: 'https://icons.iconarchive.com/icons/webalys/kameleon.pics/96/Camera-Front-icon.png',
                            }}
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