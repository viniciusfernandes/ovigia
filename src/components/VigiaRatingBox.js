import React from 'react'
import { Image, Text, StyleSheet, View, } from 'react-native'
import matisse from '../style/matisse'
import RatingStars from './RatingStars'
import TouchableButton from './TouchableButton'

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
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: matisse.laranja,
        borderRadius: 5,
        color: 'black',
        paddingLeft: 5,
        paddingRight: 5,
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
    contratarButton: {
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
        rate: 0,
        cidade: 'Não definido',
        dataInicio: 'Não definido'
    }

    const mensalidade = !props.showMensalidade ?
        <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 15, color: matisse.laranjaAvermelhado }} >Valor Mensalidade:</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: matisse.laranjaAvermelhado }} >R$1234,00</Text>
        </View> : null

    const heightMensalidade = { height: !props.showMensalidade ? styles.container.height + 80 : styles.container.height }
    return (
        <View style={[styles.container, heightMensalidade, props.style]}>
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={props.icon} />
            </View>

            <View>
                <Text style={styles.nome}>{vigia.nome}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <RatingStars rate={vigia.rate} />
                    <Text style={styles.rateBox} >{vigia.rate}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.smallBox} >{vigia.cidade}</Text>
                    <Text style={[styles.smallBox, { marginLeft: 15 }]} >{vigia.dataInicio}</Text>
                </View>
                {mensalidade}
                <TouchableButton style={styles.contratarButton}
                    styleText={styles.textButton}
                    title={props.buttonTitle}
                    onPress={props.onPress} />
            </View>


        </View>
    )
}