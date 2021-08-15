import { StyleSheet } from "react-native";
import matisse from "../../style/matisse";

const styles = StyleSheet.create({
    destaque: {
        fontSize: 25,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        width: 300
    },
    container: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 30,
        elevation: 5,


    },
    input: {
        borderBottomColor: matisse.laranja,
        borderBottomWidth: 2,
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 0,
    },
    label: {
        color: matisse.cinzaClaro,
        fontSize: 15,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold',
    },
    botao: {
        alignContent: 'center',
        borderRadius: 25,
        width: 200,
        marginTop: 50,
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        elevation: 25,
    },
    logo: {
        width: 100,
        height: 100,
    },

    icon: {
        width: 10,
        height: 10,
        
    }

})