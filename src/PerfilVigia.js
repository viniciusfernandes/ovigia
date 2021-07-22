import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity, View,
    Dimensions
} from 'react-native';
import BotaoPerfil from './BotaoPerfil';
import ImageBoxRightBar from './components/ImageBoxRightBar';
import EdicaoView from './EdicaoView';
import LabelInput from './LabelInput';
import Perfil from './Perfil';

const laranja = '#F38223'
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    nome: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
    },
    label: {
        color: '#C3C9C9',
        fontSize: 20,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})

export default props => {
    return (
        <EdicaoView>
            <Perfil />
            <ImageBoxRightBar
                imagem={'https://icons.iconarchive.com/icons/blackvariant/button-ui-microsoft-office-apps/96/Microsoft-Sync-icon.png'}
                titulo={'Dados Pessoais'}
                mensagem={'Altera a qualquer momento os seus dados'} />

            <BotaoPerfil
                imagem={'https://icons.iconarchive.com/icons/papirus-team/papirus-apps/128/preferences-desktop-notification-bell-icon.png'}
                titulo={'Notificações'}
                mensagem={'Veja todos os avisos rapidamente'} />

            <BotaoPerfil
                imagem={'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/96/Logout-icon.png'}
                titulo={'Sair'}
                mensagem={'Entre e saia em qualquer momento'} />
        </EdicaoView>
    )
}