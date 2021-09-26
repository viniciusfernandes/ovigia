import React, { useEffect } from 'react'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '../../components/Container'
import HeaderBox from '../../components/HeaderBox'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import MapBox, { DEFAULT_POSITION } from '../../components/MapBox'
import TouchableButton from '../../components/TouchableButton'
import matisse from '../../style/matisse'
import { useState } from 'react/cjs/react.development'



const styles = StyleSheet.create({
    acompanharRondaButton: {
        backgroundColor: matisse.laranja,
        marginTop: '5%',
        width: '60%'
    },
    dataHora: {
        backgroundColor: 'white',
        borderRadius: 5,
        color: matisse.laranja,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 5,
    },
    header: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: '5%',
        width: '100%'
    },

    rondaDescricao: {
        color: 'white',
        width: '100%',
    },
    rondaTitulo: {
        color: 'white',
        marginTop: 10,
        width: '100%',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textPequeno: {
        fontSize: 17,
        marginLeft: '10%',
        marginTop: '6%'
    }
})


export default props => {
    const [currentPosition, setCurrentPosition] = useState(DEFAULT_POSITION)

    return (
        <Container backgroundColor='white'>
            <HeaderBox color='black' headers={['OVigia,', 'você mais seguro!']} />
            <MapBox coordinates={[currentPosition]} />
            <TouchableButton style={styles.acompanharRondaButton} styleText={{ color: 'white', fontSize: 20 }}
                title="Acompanhar Ronda" />

            <ImageBoxRightBar
                backgroundColor={matisse.laranja}
                imagem={require('../../../images/escudocheck_branco_75.png')}>
                <Text style={styles.rondaTitulo}>Sua casa está segura!</Text>
                <Text style={styles.rondaDescricao}>Seu vigia constatou que está tudo bem.</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.dataHora} >Total Vigiado:</Text>
                    <Text style={[styles.dataHora, { marginLeft: 15 }]} >12</Text>
                </View>

            </ImageBoxRightBar>

            <ImageBoxRightBar
                backgroundColor={matisse.laranja}
                imagem={require('../../../images/sino_branco_75.png')}>
                <Text style={styles.rondaTitulo}>Você tem Mensalidades!</Text>
                <Text style={styles.rondaDescricao}>Veja as datas de vecimentos</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.dataHora} >12:43</Text>
                    <Text style={[styles.dataHora, { marginLeft: 15 }]} >12/12/2021</Text>
                </View>
            </ImageBoxRightBar>


        </Container>
    )
}