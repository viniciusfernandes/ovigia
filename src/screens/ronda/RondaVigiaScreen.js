
import React, { useContext } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';
import MapBox from '../../components/MapBox';
import TouchableButton from '../../components/TouchableButton';
import AuthContext from '../../contexts/AuthContext';
import { criarRonda } from '../../services/ronda/ronda.service';
import matisse from '../../style/matisse';
import RondaCoordinateSigleton from './RondaCoordinatesSigleton'
import ConfirmacaoModalBox from '../../components/ConfirmacaoModalBox';
import ModalBox from '../../components/ModalBox';

const styles = StyleSheet.create({
    botoesContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: '80%',
        width: '100%',
        zIndex: 1,
    },
    mapaContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapa: {

        width: '100%',
        height: '100%',
    },
    pausarButton: {
        backgroundColor: matisse.laranja,
        width: '45%'
    },
    concluirButton: {
        marginTop: '2%',
        width: '45%',
    },
})

export default props => {
    const [state, setState] = useState({
        rondaIniciada: RondaCoordinateSigleton.rondaIniciada,
        coordinates: RondaCoordinateSigleton.coordinates,
        modalVisible: false
    })

    const { idUsuario } = useContext(AuthContext)
    console.info('entrando na tela ronda vigia: ' + new Date())

    const iniciarRonda = () => {
        RondaCoordinateSigleton.iniciarRonda(coordinates => {
            console.info('atualizando coordenadas: ' + new Date())
            setState({ rondaIniciada: true, modalVisible: false, coordinates: coordinates })
            console.info('atualizou coordenadas: ' + new Date())
        })
    }

    const pausarRonda = () => {
        RondaCoordinateSigleton.pausarRonda(() => setState({
            rondaIniciada: false,
            coordinates: state.coordinates
        }))
    }

    const encerrarRonda = () => {
        const ronda = {
            idVigia: idUsuario,
            localizacoes: RondaCoordinateSigleton.coordinates,
            inicio: RondaCoordinateSigleton.obterDataInicioRonda(),
            fim: RondaCoordinateSigleton.obterDataFimRonda()
        }

        criarRonda(ronda, response => {
            RondaCoordinateSigleton.encerrarRonda(() => {
                setState({ rondaIniciada: false, modalVisible: false, coordinates: [] })
                props.navigation.navigate('homeVigia')
            })
        })

    }

    return (
        <>
            <View style={styles.botoesContainer}>
                <TouchableButton style={styles.pausarButton} styleText={{ color: 'white', fontSize: 20 }}
                    title={state.rondaIniciada ? 'Pausar Ronda' : 'Iniciar Ronda'}
                    onPress={() => {
                        if (state.rondaIniciada) {
                            pausarRonda()
                        } else {
                            iniciarRonda()
                        }
                    }}
                />
                <TouchableButton style={styles.concluirButton} styleText={{ fontSize: 20 }}
                    title='Concluir Ronda' onPress={() => {
                        pausarRonda()
                        setState({ ...state, modalVisible: true })
                    }}
                />
            </View>
            <View style={styles.mapaContainer}>
                <MapBox id='rondaScreen' coordinates={state.coordinates.slice()} fullScreen drawLines />
                <ConfirmacaoModalBox visible={state.modalVisible}
                    onClose={() => setState({ ...state, modalVisible: false })}
                    onConfirm={() => {
                        encerrarRonda()
                    }} />
            </View>
        </>
    );
}