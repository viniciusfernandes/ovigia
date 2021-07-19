import React from 'react';
import {
    StyleSheet,
    Text, TextInput, TouchableOpacity, View,
    Image, Dimensions
} from 'react-native';
import LabelInput from './LabelInput';

const laranja = '#F38223'
const width = Dimensions.get('window').width
const diameter = 150
const borda = 5
const diameterMenor = diameter - 2 * borda
const radius = diameter / 2 + borda
const radiusMenor = radius - borda
const init = (width - diameter) / 2
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: laranja,
    },
    formulario: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        marginTop: 180,
        paddingTop: 100,
        elevation: 5,
        width: width,
        alignContent: 'center'
    },
    nome: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 20,
        borderRadius: 20,
        elevation: 3
    },
    label: {
        color: '#C3C9C9',
        fontSize: 20,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titulo: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 30
    },
    botao: {
        alignContent: 'center',
        borderRadius: 25,
        width: 200,
        marginTop: 50,
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        elevation: 25,
    },
    logo: {
        width: 100,
        height: 100,
    },
    socialLogo: {
        width: 40,
        height: 40,
    },
})

export default props => {
    return (
        <>
            <View style={styles.formulario}>
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
                    <Text style={styles.label}>São Paulo/SP</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <LabelInput titulo={'E-mail'} />
                    <LabelInput titulo={'Celular'} />
                    <LabelInput titulo={'Senha'} />
                </View>
                <TouchableOpacity style={{
                    flexDirection: 'row', justifyContent: 'center', marginTop: 50, marginLeft: 30,
                    marginRight: 30,
                }}>
                    <Text style={[styles.label, {
                        backgroundColor: laranja, borderRadius: 20, color: 'white', width: width / 2, height: 40,
                        paddingTop: 5, textAlign: 'center', elevation: 5
                    }]}>Salvar</Text>
                </TouchableOpacity>

            </View>

        </>
    )
}