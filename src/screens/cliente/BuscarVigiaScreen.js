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
import VigiaRatingBox from "../../components/VigiaRatingBox"
import matisse from "../../style/matisse"

const styles = StyleSheet.create({

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
            <HeaderBox headers={['Encontre o', 'vigia mais próximo.']}
                detail={'Localização e dados do vigia:'} />

            <MapBox id='buscarVigiaScreen' />

            <VigiaRatingBox
                icon={require('../../../images/usuario_branco_75.png')}
                vigia={vigia} />
        </Container>
    )
}