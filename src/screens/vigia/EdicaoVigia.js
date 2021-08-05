import React, { useState } from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity, View,
    Dimensions,
    TextInput,
    Button
} from 'react-native';
import EdicaoPerfil from '../EdicaoPerfil';
import LabelInput from '../../components/LabelInput'
import ImagemPerfil from '../../screens/ImagemPerfil';
import matisse from '../../style/matisse';
import { obterVigia, criarVigia } from '../../services/vigia/vigiaServices';

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
    botaoSalvar: {
        borderRadius: 20,
        color: 'red',
        backgroundColor: matisse.laranja,
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '15%',
        elevation: 3,
        width: '40%',

    },
    botaoSalvarText: {

        color: 'white',
        height: 40,
        paddingTop: 5,
        textAlign: 'center',
        width: width / 2,
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 20,
        borderRadius: 20,
        elevation: 1
    },
    titulo: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 20
    },
})

export default props => {
    const [vigia, setVigia] = useState({
        nome: 'renato alberto',
        email: 'renato.alberto@gmail.com',
        telefone: '54254235423',
        senha: '1234'
    })

    return (
        <EdicaoPerfil >
            <ImagemPerfil />
            <LabelInput style={{ label: { marginTop: '2%' } }} titulo={'E-mail'}
                valor={vigia.email} onChangeText={email => setVigia({ ...vigia, email })} />
            <LabelInput titulo={'Celular'} valor={vigia.telefone} />
            <LabelInput titulo={'Senha'} valor={vigia.senha} />
            <TouchableOpacity style={styles.botaoSalvar}
                onPress={() => {
                    criarVigia(vigia, (data) => {
                        console.log('id vigia: ' + data)
                        setVigia({})
                    })
                }
                }>
                <Text style={[styles.label, styles.botaoSalvarText]}>Salvar</Text>
            </TouchableOpacity>

        </EdicaoPerfil >
    )
}