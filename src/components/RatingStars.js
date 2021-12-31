import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import matisse from "../style/matisse"
import TouchableButton from './TouchableButton'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100,
        height: 20,
    },
    star: {
        width: 20,
        height: 20,
        borderRadius: 0,
    }
})

const START_STATUS = {
    FULL: 'FULL', EMPTY: 'EMPTY', HALF: 'HALF'
}

const gerarStar = (id, status, onPress) => {
    var star = null;
    var styleText = null
    var styleBackground = null
    if (status === START_STATUS.FULL) {
        star = require('../../images/star_orange.png')
    } else if (status === START_STATUS.HALF) {
        star = require('../../images/star_orange_gray.png')
    } else {
        star = require('../../images/star_gray.png')
    }

    if (status === START_STATUS.FULL) {
        styleText = { color: 'white' }
        styleBackground = { backgroundColor: matisse.amareloDourado }
    } else {
        styleText = { color: 'black' }
        styleBackground = { backgroundColor: 'white' }
    }

    return (
        // <TouchableOpacity key={id} style={styles.star} onPress={() => console.info('xxxxxxxxx')}>
        //      <Image style={{ width: '100%', height: '100%' }} source={star} />
        //  </TouchableOpacity>
        <TouchableButton key={id} style={[styles.star, styleBackground]} styleText={styleText} title={id + 1} onPress={onPress} />
    )
}

const gerarRate = (rate, onRate) => {
    var stars = []
    let roundedRate = Math.floor(rate)
    var rest = rate - roundedRate

    if (rest >= 0.9) {
        roundedRate += 1
        rest = 0.0
    } else if (rest < 0.45) {
        rest = 0.0
    }

    const hasRest = rest >= 0.45
    const starValues = new Map()
    starValues.set(0, 1)
    starValues.set(1, 2)
    starValues.set(2, 3)
    starValues.set(3, 4)
    starValues.set(4, 5)

    if (roundedRate <= 0) {
        const status = hasRest ? START_STATUS.HALF : START_STATUS.EMPTY
        stars[0] = gerarStar(0, status, () => onRate(starValues.get(0)))

        for (let idx = 1; idx < starValues.size; idx++) {
            stars[idx] = gerarStar(idx, START_STATUS.EMPTY, () => onRate(starValues.get(idx)))
        }
    } else {
        const maxRate = starValues.get(starValues.size - 1)
        for (let idx = 0; idx < starValues.size; idx++) {
            const rating = starValues.get(idx)
            if (rating < roundedRate) {
                stars[idx] = gerarStar(idx, START_STATUS.FULL, () => onRate(rating))
            } else if (rating == roundedRate) {
                stars[idx] = gerarStar(idx, START_STATUS.FULL, () => onRate(rating))
                if (hasRest && rating < maxRate) {
                    idx++
                    rating = starValues.get(idx)
                    stars[idx] = gerarStar(idx, START_STATUS.HALF, () => onRate(rating))
                }
            } else {
                stars[idx] = gerarStar(idx, START_STATUS.EMPTY, () => onRate(rating))
            }

        }
    }
    return stars
}

export default props => {
    return (
        <View style={styles.container}>
            {gerarRate(props.rate, props.onRate)}
        </View>
    )
}