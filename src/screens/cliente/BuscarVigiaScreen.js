import React from "react"
import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useState } from "react/cjs/react.development"
import Container from "../../components/Container"
import HeaderBox from "../../components/HeaderBox"
import ImageBoxRightBar from "../../components/ImageBoxRightBar"
import LabelInput from "../../components/LabelInput"
import MapBox from "../../components/MapBox"
import RatingStars from "../../components/RatingStars"
import matisse from "../../style/matisse"

const styles = StyleSheet.create({
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
        color: matisse.laranja,
        paddingLeft: 5,
        paddingRight: 5,
        width: '30%'
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
    rateContainer: {
        flexDirection: 'row',
    },
    rating: {
        backgroundColor: matisse.laranjaClaro,
        flexDirection: 'row'
    }
})

export default props => {
    const vigia = {
        nome: 'Renato Canuto',
        rate: 3.46,
        cidade: 'São Paulo',
        dataInicio: '12/12/2020'
    }



    return (
        <Container>
            <HeaderBox headers={['Encontre o', 'vigia mais próximo.']} />

            <MapBox id='buscarVigiaScreen' />


            <ImageBoxRightBar
                imagem={require('../../../images/escudocheck_laranja_75.png')}>
                <Text style={styles.nome}>{vigia.nome}</Text>
                <View style={styles.rateContainer}>
                    <RatingStars rate={vigia.rate} />
                    <Text style={styles.rateBox} >{vigia.rate}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.smallBox} >{vigia.cidade}</Text>
                    <Text style={[styles.smallBox, { marginLeft: 15 }]} >{vigia.dataInicio}</Text>
                </View>

            </ImageBoxRightBar>
        </Container>
    )
}