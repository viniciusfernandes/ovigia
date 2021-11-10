import { useFocusEffect } from "@react-navigation/core"
import React from "react"
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useContext, useState } from "react/cjs/react.development"
import Container from "../../components/Container"
import HeaderBox from "../../components/HeaderBox"
import ImageBoxRightBar from "../../components/ImageBoxRightBar"
import LabelInput from "../../components/LabelInput"
import MapBox from "../../components/MapBox"
import RatingStars from "../../components/RatingStars"
import VigiaRatingBox from "../../components/VigiaRatingBox"
import AuthContext from "../../contexts/AuthContext"
import { obterResumoRonda } from "../../services/ronda/ronda.service"
import { obterVigiasProximos } from "../../services/vigia/vigia.services"
import matisse from "../../style/matisse"

export default props => {
    const vigia = {
        nome: 'Renato Canuto',
        rate: 3.46,
        cidade: 'São Paulo',
        dataInicio: '12/12/2020'
    }

    const { localizacao } = useContext(AuthContext)
    const [vigiaBoxes, setVigiaBoxes] = useState([])
    useFocusEffect(
        React.useCallback(() => {
            let boxes = []
            obterVigiasProximos(localizacao, response => {
                response.vigias.forEach(vigia => {
                    let idVigia = vigia.id
                    boxes.push(<VigiaRatingBox key={idVigia}
                        style={{ marginBottom: 10 }}
                        icon={require('../../../images/usuario_branco_75.png')}
                        vigia={vigia}
                        buttonTitle='Contratar'
                        onPress={() => { console.info('Realizou a contratacao do vigia: ' + idVigia) }}
                        showMensalidade />)
                })
                setVigiaBoxes(boxes)
            })
        }, [])
    );
    return (
        <Container>
            <ScrollView style={{   width: '100%' }}>
                <HeaderBox headers={['Encontre o', 'vigia mais próximo.']}
                    detail={'Seu vigia mais próximo esta aqui!'} />
                {/* <MapBox id='buscarVigiaScreen' pinTitle={'Seu vigia esta aqui!'} /> */}
                {vigiaBoxes}
            </ScrollView>

        </Container>
    )
}