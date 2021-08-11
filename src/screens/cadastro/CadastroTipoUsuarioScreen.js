import React, { useContext } from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native'
import Container from '../../components/Container'
import TouchableButton from '../../components/TouchableButton'
import { larguraPercentual } from '../../constantes/medidas/Medidas'
import matisse from '../../style/matisse'
const styles = StyleSheet.create({
    botaoProximo: {
        backgroundColor: matisse.laranja,
        width: '40%',
    },
    botaoVoltar: {
        backgroundColor: matisse.cinzaClaro,
        width: '40%',
    },
    botoesSalvar: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around',
        marginTop: '30%',
        width: '100%'
    },
    box: {
        alignItems: 'center',
        borderRadius: 20,
        elevation: 3,
        height: larguraPercentual(40),
        justifyContent: 'center',
        padding: '5%',
        width: larguraPercentual(50),


    },
    boxVigia: {
        backgroundColor: matisse.laranja,
        marginBottom: '5%',
        marginTop: '5%',
    },
    boxCliente: {
        backgroundColor: matisse.cinzaClaro,
    },
    boxIcon: {
        flex: 1,
        width: '40%',
        resizeMode: 'contain',
    },
    textoInicio: {
        fontSize: 35,
        fontWeight: 'bold',
        color: matisse.laranja,
        marginTop: '10%',
        marginBottom: '5%'
    },
    textoPergunta: {
        color: matisse.cinzaEscuro,
        fontSize: 20,
    },
    tipoUsuario: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    textoBotao: {
        fontSize: 20
    },
    textoBotaoVoltar: {
        color: matisse.cinzaEscuro
    },
    textoBotaoProximo: {
        color: 'white'
    }
})
export default (props) => {
    return (
        <Container backgroundColor='white'>
            <Text style={styles.textoInicio}>Vamos Começar!</Text>
            <Text style={styles.textoPergunta}>Primeiro, queremos saber</Text>
            <Text style={styles.textoPergunta}>se você é:</Text>
            <TouchableOpacity style={[styles.box, styles.boxVigia]}>
                <Image
                    style={styles.boxIcon}
                    source={require('../../../images/escudo_branco_75.png')}
                />
                <Text style={styles.tipoUsuario}>Vigia</Text>

            </TouchableOpacity>
            <TouchableOpacity style={[styles.box, styles.boxCliente]}>
                <Image
                    style={styles.boxIcon}
                    source={require('../../../images/usuario_branco_75.png')}
                />
                <Text style={styles.tipoUsuario}>Cliente</Text>
            </TouchableOpacity>
            <View style={styles.botoesSalvar}>
                <TouchableButton title='Voltar' style={styles.botaoVoltar}
                    styleText={[styles.textoBotao, styles.textoBotaoVoltar]} 
                    onPress={ () => props.navigation.goBack()}/>
                <TouchableButton title='Próximo' style={styles.botaoProximo}
                    styleText={[styles.textoBotao, , styles.textoBotaoProximo]} />

            </View>
        </Container>
    )
}
