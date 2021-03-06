import { Dimensions } from "react-native"

const window = Dimensions.get('window')
const larguraLimite = 400
const alturaLimite = 800
const Medidas = {
    alturaMaxima: window.height,
    isTablet: window.width > larguraLimite && window.height > alturaLimite,
    larguraMaxima: window.width,
}

export const larguraPercentual = percent => Medidas.larguraMaxima * percent / 100

export default Medidas;