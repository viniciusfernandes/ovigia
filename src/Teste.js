//Example to Hide Show Component in React Native
//https://aboutreact.com/example-to-hide-show-component-in-react-native/

//import React in our code
import React, { useState } from 'react';

//import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    View,
    Button,
    Image
} from 'react-native';

export default () => {
    const [shouldShow, setShouldShow] = useState(true);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/*Here we will return the view when state is true 
        and will return false if state is false*/}
                {shouldShow ? (
                    <Image
                        source={{
                            uri:
                                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
                        }}
                        style={{ width: 250, height: 250 }}
                    />
                ) : null}
                <Button
                    title="Hide/Show Component"
                    onPress={() => setShouldShow(!shouldShow)}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
});
