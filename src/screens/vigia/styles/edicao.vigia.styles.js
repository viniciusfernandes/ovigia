import { StyleSheet } from 'react-native';
import matisse from '../../../style/matisse';
import Medidas from '../../../constantes/medidas/Medidas';

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
        width: Medidas.larguraMaxima / 2,
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

export default styles