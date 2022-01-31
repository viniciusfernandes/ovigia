import React, { useContext } from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import Container from '../../components/Container'
import TouchableButton from '../../components/TouchableButton'
import { larguraPercentual } from '../../constantes/medidas/Medidas'
import AuthContext from '../../contexts/AuthContext'
import matisse from '../../style/matisse'
const styles = StyleSheet.create({
    botao: {
        backgroundColor: 'white',
        width: larguraPercentual(45),
    },
    boxIcon: {
        marginTop: '20%',
        width: '30%',
        resizeMode: 'contain',
    },
    textoBotao: {
        color: matisse.laranja,
        fontSize: 20,
        textAlign: 'center'
    },
    textoTitulo: {
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: '10%'
    },
    textoMenor: {
        color: 'white',
        fontSize: 30,
    },
})
export default (props) => {
    const { habilitarHome } = useContext(AuthContext)
    return (
        <Container>
            <Image
                style={styles.boxIcon}
                source={require('../../../images/check_branco_75.png')}
            />
            <Text style={[styles.texto, styles.textoTitulo]}>Parabéns!</Text>
            <Text style={[styles.texto, styles.textoMenor]}>Sua conta foi criada com</Text>
            <Text style={[styles.texto, styles.textoMenor]}>sucesso e agora é só</Text>
            <Text style={[styles.texto, styles.textoMenor]}>esperar pela validação</Text>
            <Text style={[styles.texto, styles.textoMenor, { marginBottom: '30%' }]}>dos seus documentos.</Text>
            <TouchableButton title='Acessar Conta' style={styles.botao}
                styleText={[styles.textoBotao, styles.textoBotaoCinza]}
                onPress={() => habilitarHome()} />
        </Container>
    )
}
