import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

const laranja = '#F38223'
const width = Dimensions.get('window').width
const diameter = 150
const borda = 5
const diameterMenor = diameter - 2 * borda
const radius = diameter / 2 + borda
const radiusMenor = radius - borda
const init = (width - diameter) / 2
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: laranja,
    },
    formulario: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        marginTop: '50%',
        paddingTop: '20%',
        elevation: 5,
        width: width,
        alignContent: 'center'
    },
})

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.formulario}>
                {props.children}
            </View>
        </View>
    )
}