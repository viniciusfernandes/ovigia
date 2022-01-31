import { StyleSheet } from 'react-native';
import matisse from '../../../style/matisse';

const styles = StyleSheet.create({
    bemVindo: {
        fontSize: 25,
        marginLeft: '5%',
        marginRight: 20,
        marginTop: 25,
        fontWeight: 'bold',
        marginBottom: 10,

    },
    formulario: {
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 30,
        width: '80%'
    },
    esqueciSenha: {
        fontWeight: 'bold',
        marginBottom: '5%',
        textAlign: 'center',
    },
    input: {
        borderBottomColor: matisse.laranja,
        borderBottomWidth: 2,
        color: 'black',
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 0,
    },
    label: {
        color: matisse.cinzaClaro,
        fontSize: 15,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold',
    },
    botao: {
        borderRadius: 25,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '5%',
        padding: '2%',
        paddingTop: '2%',
        backgroundColor: 'white',
        elevation: 5,
        textAlign: 'center',
    },
    botaoContainer: {
        marginTop: '5%',
        width: '50%'
    },
    logo: {
        marginBottom: '5%',
        marginTop: '10%',
        height: '25%',
        width: '48%',

    },
    mensagemEntrarCom: {
        color: 'white',
        marginTop: '5%'
    },
    socialMidiaLogo: {
        width: 40,
        height: 40,
    },
    socialMediasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '2%',
        width: '40%'
    },
    naoTemConta: {
        color: matisse.laranjaEscuro,
    },
    cadastre: {
        color: 'white'
    },
    botoesCadastroContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '8%'
    },
    usuarioInvalido: {
        color: matisse.laranjaAvermelhado,
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: '2%',
        textAlign: 'center',
    },
})

export default styles