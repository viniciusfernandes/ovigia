import React from "react"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
     
    header: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: '5%',
        width: '100%'
    },
    
    textPequeno: {
        fontSize: 17,
        marginLeft: '10%',
        marginTop: '6%'
    }
})
export default props => {
    const headers = []
    
    return (
        <View style={{ width: '100%', marginTop: '10%' }}>
            <Text style={[styles.header]}>Olá {nomeUsuario}</Text>
            <Text style={styles.header}>Vamos começar?</Text>
            <Text style={[styles.header, styles.textPequeno]}>{props.descricao}</Text>
        </View>
    )
}