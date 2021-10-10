import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import HeaderBox from "../../components/HeaderBox";
import VigiaRatingBox from "../../components/VigiaRatingBox";
import matisse from "../../style/matisse";

const styles = StyleSheet.create({
    textPagamento: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    textAtrasado: {
        color: matisse.laranjaAvermelhado,
        fontSize: 20,
        fontWeight: 'bold',
    },
    textEmDia: {
        color: matisse.laranja,
        fontSize: 20,
        fontWeight: 'bold',
    },
    vencimentoContainer: {
        alignItems: 'flex-start'
    }
})
export default props => {
    const vigia = {
        nome: 'Renato Canuto',
        rate: 3.46,
        cidade: 'São Paulo',
        dataInicio: '12/12/2020'
    }

    const isAtrasado = true;
    const vencimentoStyle = isAtrasado ? styles.textAtrasado : styles.textEmDia
    return (
        <Container backgroundColor='white' >
            <HeaderBox color='black' headers={['Suas finanças', 'na palma da mão.']} />
            <VigiaRatingBox
                icon={require('../../../images/usuario_branco_75.png')}
                vigia={vigia}
                style={{ borderRadius: 0, elevation: 0 }}
                buttonTitle='Encerrar Contrato'
                onPress={() => { console.info('Encerrou a contratacao') }} />

            <View style={{ backgroundColor: matisse.cinzaClaro, height: 2, marginBottom: '10%', marginTop: '10%', width: '80%' }} />
            <View style={styles.vencimentoContainer}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }} >Pagamento</Text>
                <Text style={vencimentoStyle}>Você está em {isAtrasado ? 'atraso' : 'dia'}!</Text>
                <Text style={vencimentoStyle}>O vencimento  {isAtrasado ? 'foi' : 'será'} 12/12/2021</Text>
            </View>

        </Container>
    )
}