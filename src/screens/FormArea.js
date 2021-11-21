import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Container from '../components/Container'
import Medidas from '../constantes/medidas/Medidas';

const styles = StyleSheet.create({

    formulario: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        marginTop: '50%',
        paddingTop: '20%',
        elevation: 5,
        width: Medidas.larguraMaxima,
        alignItems: 'center'
    },
})

export default props => {
    return (
        <Container >
            <View style={styles.formulario}>
                {props.children}
            </View>
        </Container>
    )
}