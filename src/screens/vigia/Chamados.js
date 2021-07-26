import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '../../components/Container'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import Navegacao from '../../Navegacao'
import matisse from '../../style/matisse'

const styles = StyleSheet.create({
    header: {
        marginLeft: 10,
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textPequeno: {
        fontSize: 17,
        marginLeft: 20,
        marginTop: 30
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


export default props => {
    function obterChamados() {
        return [
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/08/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/08/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/08/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/08/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/08/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/08/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/08/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/08/2021' },

        ]
    }

    function gerarTextChamados() {
        let textsChamados = []
        let chamados = obterChamados()
        var box = null
        var chamado = null
        for (var i = 0; i < chamados.length; i++) {
            chamado = chamados[i]
            box =
                <ImageBoxRightBar
                    key={'chamado' + i}
                    imagem={'../../images/perfil-vinicius.jpg'}>
                    <Text style={{ marginTop: 10, width: '100%', fontSize: 15, fontWeight: 'bold' }}>{chamado.nome}</Text>
                    <Text style={{ width: '100%' }}>{chamado.logradouro}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.dataHora} >{chamado.hora}</Text>
                        <Text style={[styles.dataHora, { marginLeft: 15 }]} >{chamado.data}</Text>
                    </View>

                </ImageBoxRightBar>

            textsChamados.push(box)

        }

        return textsChamados
    }

    return (
        <Container>
            <Text style={[styles.header, { marginTop: 50 }]}>Acompanhe</Text>
            <Text style={styles.header}>todos os chamados</Text>
            <Text style={[styles.header, styles.textPequeno]}>Chamados em aberto</Text>
            {gerarTextChamados()}

        </Container>
    )
}