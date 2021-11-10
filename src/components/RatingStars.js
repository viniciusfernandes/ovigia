import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100,
        height: 20,
    },
    star: {
        width: 20,
        height: 20
    }
})

const gerarRate = rate => {
    var stars = []
    const roundedRate = Math.floor(rate)
    var rest = rate - roundedRate

    if (rest >= 0.9) {
        roundedRate += 1
        rest = 0.0
    } else if (rest < 0.45) {
        rest = 0.0
    }

    const hasRest = rest >= 0.45
    const maxRate = 5
    var startKey = null
    if (roundedRate <= 0) {
        if (hasRest) {
            stars[0] = <Image key={'start-0'} style={styles.star} source={require('../../images/star_orange_gray.png')} />
        }
        else {
            stars[0] = <Image key={'start-0'} style={styles.star} source={require('../../images/star_gray.png')} />
        }
        for (var rt = 1; rt < maxRate; rt++) {
            startKey = 'start-' + rt
            stars[rt] = <Image key={startKey} style={styles.star} source={require('../../images/star_gray.png')} />
        }
    } else {
        for (var rt = 1; rt <= maxRate; rt++) {
            startKey = 'start-' + rt
            if (rt < roundedRate) {
                stars[rt] = <Image key={startKey} style={styles.star} source={require('../../images/star_orange.png')} />
            } else if (rt == roundedRate) {
                stars[rt] = <Image key={startKey} style={styles.star} source={require('../../images/star_orange.png')} />
                if (hasRest) {
                    rt++
                    startKey = 'start-' + rt
                    stars[rt] = <Image key={startKey} style={styles.star} source={require('../../images/star_orange_gray.png')} />
                }
            } else {
                stars[rt] = <Image key={startKey} style={styles.star} source={require('../../images/star_gray.png')} />

            }

        }
    }

    return stars
}

export default props => {
    return (
        <View style={styles.container}>
            {gerarRate(props.rate)}
        </View>
    )
}