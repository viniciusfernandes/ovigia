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
import { criarSolicitacaoVisita, obterVigiasProximos } from "../../services/vigia/vigia.services"
import matisse from "../../style/matisse"

export default props => {
    const vigia = {
        nome: 'Renato Canuto',
        rate: 3.46,
        cidade: 'São Paulo',
        dataInicio: '12/12/2020'
    }

    const { idUsuario, nomeUsuario, telefoneUsuario, localizacao } = useContext(AuthContext)
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
                        buttonTitle='Solicitar Visita'
                        onPress={() => {
                            let solicitacao = {
                                idCliente: idUsuario,
                                idVigia: vigia.id,
                                nomeCliente: nomeUsuario,
                                telefoneCliente: telefoneUsuario,
                                localizacaoCliente: localizacao
                            }
                            criarSolicitacaoVisita(solicitacao, () => console.info('Criou uma solicitacao'))
                        }}
                        showMensalidade />)
                })
                setVigiaBoxes(boxes)
            })
        }, [])
    );
    return (
        <Container>
            <HeaderBox style={{ marginBottom: 10 }} headers={['Encontre o vigia mais', 'próximo a você.']}
                detail={'Solicite seus valores. Vamos lá!'} />
            <ScrollView style={{ width: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                    {vigiaBoxes}
                </View>
            </ScrollView>

        </Container>
    )
}