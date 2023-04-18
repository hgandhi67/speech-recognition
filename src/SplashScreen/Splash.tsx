import React from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import { screenHeight, screenWidth } from '../Helpers/Utils';

function Splash() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../Assets/Images/Splash.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        height: screenHeight,
        width: screenWidth,
    }
});

export default Splash