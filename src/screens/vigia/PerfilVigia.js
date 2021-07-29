import React from 'react';
import ImageBoxRightBar from '../../components/ImageBoxRightBar';
import EdicaoView from '../../EdicaoView';
import { StyleSheet, Text, View } from 'react-native';
import Medidas from '../../constantes/medidas/Medidas'
import ImagemPerfil from '../ImagemPerfil';

const isTablet = Medidas.isTablet
const styles = StyleSheet.create({

    boxContext: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginBottom: '5%',
        marginTop: '5%',
        width: '95%'
    },

    titulo: {
        fontWeight: 'bold',
        fontSize: isTablet ? 30 : 20,
    },
    mensagem: {
        color: '#C3C9C9',
        fontSize: isTablet ? 25 : 15,
    }
})

export default props => {
    return (
        <EdicaoView>
            <ImagemPerfil />
            <ImageBoxRightBar showBar imagem={require('../../../images/ciclo_laranja_75.png')}> 
                <View style={styles.boxContext}>
                    <Text style={styles.titulo}>Dados Pessoais</Text>
                    <Text style={styles.mensagem}>Altere os seus dados</Text>
                </View>
            </ImageBoxRightBar>

            <ImageBoxRightBar showBar imagem={require('../../../images/sino_inteiro_laranja_75.png')}>
                <View style={styles.boxContext}>
                    <Text style={styles.titulo}>Notificações</Text>
                    <Text style={styles.mensagem}>Veja todos os avisos rapidamente</Text>
                </View>
            </ImageBoxRightBar>

            <ImageBoxRightBar showBar imagem={require('../../../images/sair_laranja_75.png')}>
                <View style={styles.boxContext}>
                    <Text style={styles.titulo}>Sair</Text>
                    <Text style={styles.mensagem}>Entre e saia em qualquer momento</Text>
                </View>
            </ImageBoxRightBar>
        </EdicaoView>
    )
}