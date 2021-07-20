import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity, View,
    Dimensions
} from 'react-native';
import EdicaoView from './EdicaoView';
import LabelInput from './LabelInput';
import Perfil from './Perfil';
import matisse from './style/matisse';

 const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    nome: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
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
})

export default props => {
    return (
        <EdicaoView>
            <Perfil />
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
                    backgroundColor: matisse.laranja, borderRadius: 20, color: 'white', width: width / 2, height: 40,
                    paddingTop: 5, textAlign: 'center', elevation: 5
                }]}>Salvar</Text>
            </TouchableOpacity>
        </EdicaoView>
    )
}