import { Dimensions } from "react-native"

const window = Dimensions.get('window')
const larguraLimite = 380
const alturaLimite = 500
const Medidas = {
    alturaMaxima: window.height,
    isTablet: window.width > larguraLimite && window.height > alturaLimite,
    larguraMaxima: window.width
}

export default Medidas;