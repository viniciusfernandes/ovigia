import React, { useState } from 'react'
import { Image, Text, StyleSheet, View, ImageBackground, } from 'react-native'
import matisse from '../style/matisse'
import RatingStars from './RatingStars'
import TouchableButton from './TouchableButton'
import { atualizarAvaliacaoVigia } from '../services/vigia/vigia.services'
import { useFocusEffect } from '@react-navigation/native'

const larguraIconContainer = 70
const larguraIcon = larguraIconContainer - 20

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 3,
        flexDirection: 'row',
        height: 140,
        width: '80%',
    },
    icon: {
        backgroundColor: matisse.cinzaClaro,
        borderRadius: 10,
        height: larguraIcon,
        width: larguraIcon,
    },
    iconContainer: {
        alignItems: 'center',
        height: larguraIconContainer,
        justifyContent: 'center',
        width: larguraIconContainer,
        padding: 0
    },
    nome: {
        color: 'black',
        marginTop: 10,
        width: '100%',
        fontSize: 15,
        fontWeight: 'bold'
    },
    smallBox: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: matisse.laranja,
        borderRadius: 5,
        color: matisse.laranja,
        fontSize: 12,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: 'center',
        width: 100
    },
    rateBox: {
        backgroundColor: matisse.amareloDourado,
        textAlign: 'center',
        borderRadius: 5,
        color: 'white',
        marginLeft: 10,
        width: 50,
        height: 20,
    },
    rating: {
        backgroundColor: matisse.laranjaClaro,
        flexDirection: 'row'
    },
    button: {
        backgroundColor: matisse.laranja,
        marginTop: '5%'
    },
    textButton: {
        color: 'white',
        fontSize: 20,
    }
})


export default props => {
    const vigia = props.vigia ? props.vigia : {
        nome: 'Não definido',
        avaliacao: 0.00,
        telefone: 'Não definido',
        dataInicio: 'Não definido',
        valor: 0.0
    }
    const [valorAvaliacao, setValorAvaliacao] = useState(vigia.avaliacao)
    const mensalidade = !props.showMensalidade ?
        <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 15, color: matisse.laranjaAvermelhado }} >Valor Mensalidade:</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: matisse.laranjaAvermelhado }} >R${vigia.valor}</Text>
        </View> : null

    const heightMensalidade = { height: !props.showMensalidade ? styles.container.height + 80 : styles.container.height }
    let button;
    if (!props.hideButton) {
        button = <TouchableButton style={[styles.button, props.styleButton]}
            styleText={styles.textButton}
            title={props.buttonTitle}
            onPress={props.onPress} />
    }

    const atualizarValorAvaliacao = (vigia, valorAvaliacao) => {
        atualizarAvaliacaoVigia(vigia.id, valorAvaliacao, novoValor => setValorAvaliacao(novoValor))
    }

    return (
        <View style={[styles.container, heightMensalidade, props.style]}>
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={props.icon} />
            </View>

            <View>
                <Text style={styles.nome}>{vigia.nome}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <RatingStars rate={valorAvaliacao}
                        onRate={valorAvaliacao => atualizarValorAvaliacao(vigia, valorAvaliacao)} />
                    <Text style={styles.rateBox} >{valorAvaliacao}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.smallBox} >{vigia.telefone}</Text>
                    <Text style={[styles.smallBox, { marginLeft: 15 }]} >{vigia.dataInicio}</Text>
                </View>
                {mensalidade}
                {button}
            </View>


        </View>
    )
}