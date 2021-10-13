import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react/cjs/react.development'
import Container from '../../components/Container'
import HeaderBox from '../../components/HeaderBox'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import { obterChamadosAtivos } from '../../services/chamado/chamado.service'
import matisse from '../../style/matisse'

const styles = StyleSheet.create({
    header: {
        marginLeft: '5%',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textPequeno: {
        fontSize: 17,
        marginLeft: '5%',
        marginTop: '6%'
    },
    dataHora: {
        backgroundColor: matisse.laranja,
        borderRadius: 5,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 5,
    }
})

function gerarChamadosBoxes(chamados) {
    const total = chamados.length
    let chamadosBoxes = []
    var box = null
    var chamado = null

    for (var i = 0; i < total; i++) {
        chamado = chamados[i]
        console.info('XXX: '+JSON.stringify(chamado))

        box =
            <ImageBoxRightBar
                key={'chamado' + i}
                imagem={require('../../../images/perfil-vinicius.jpg')}>
                <Text style={{ marginTop: 10, width: '100%', fontSize: 15, fontWeight: 'bold' }}>{chamado.nomeCliente}</Text>
                <Text style={{ width: '100%' }}>{'Avenida Macunaíma, 1234'}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.dataHora} >{chamado.hora}</Text>
                    <Text style={[styles.dataHora, { marginLeft: 15 }]} >{chamado.data}</Text>
                </View>

            </ImageBoxRightBar>

        chamadosBoxes.push(box)

    }

    return chamadosBoxes
}

export default props => {
    const idVigia = 'asdf1234'
    const [chamadoBoxes, setChamadoBoxes] = useState([])
    useEffect(()=>{
        obterChamadosAtivos(idVigia, chamados => {
            setChamadoBoxes(gerarChamadosBoxes(chamados))
        })

    },[])
    return (
        <Container>
            <ScrollView>
                <HeaderBox headers={['Acompanhe', 'todos os chamados']} detail='Chamados em aberto' />
                {chamadoBoxes}
            </ScrollView>

        </Container>
    )
}