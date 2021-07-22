import React from 'react'
import { Text, View } from 'react-native'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'

export default props => {
    function obterChamados() {
        return [
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/07:/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/07:/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/07:/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/07:/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/07:/2021' },
            { nome: 'Vinicius Fernandes', logradouro: 'Av. Paulista 1234 - São Paulo', hora: '14:54h', data: '12/07:/2021' },
        ]
    }

    function gerarTextChamados() {
        let textsChamados = []
        let chamados = obterChamados()
        chamados.forEach(chamado => {
            let box =
                <ImageBoxRightBar image={'https://scontent.fcgh3-1.fna.fbcdn.net/v/t1.6435-1/p320x320/207600281_4194372680609413_4216023978283777792_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeFqf-Mt9YCd9L7XHu9zD3_G9Mq99Rd1S370yr31F3VLfurd-412xZFK6gr5jcikopNyIeakuGcYh6sSHJtqlxKw&_nc_ohc=I4OSTiJPDjMAX97LmKc&_nc_ht=scontent.fcgh3-1.fna&oh=d5793c23da9b2c5b25cf677da8cd94a4&oe=60FA5568'}>
                    <Text style={{ marginTop: 15, width: '100%' }}>{chamado.nome}</Text>
                    <Text style={{ width: '100%' }}>{chamado.logradouro}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text  >{chamado.hora}</Text>
                        <Text style={{ marginLeft: '20%' }} >{chamado.data}</Text>
                    </View>

                </ImageBoxRightBar>
            textsChamados.push(box)
        })
        return textsChamados
    }

    return (
        <>
            <Text>Acompanhe todos os chamados</Text>
            <Text>Chamados em aberto</Text>
            {gerarTextChamados()}

        </>
    )
}