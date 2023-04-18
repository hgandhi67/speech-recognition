import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ColorsHelper from '../../Helpers/ColorsHelper';
import ConstantsHelper from '../../Helpers/ConstantsHelper';
import { screenHeight, screenWidth } from '../../Helpers/Utils';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    startedView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: ColorsHelper.whiteClr,
        alignItems: 'center',
        minHeight: screenHeight * 0.4,
        borderRadius: 20,
        width: screenWidth
    },
    headerTitle: {
        fontFamily: ConstantsHelper.fontFamilySemiBold,
        fontSize: 23,
        textAlign: 'center',
        width: screenWidth * 0.7,
        color: ColorsHelper.blackClr,
        marginTop: 20
    },
    subTitle: {
        fontFamily: ConstantsHelper.fontFamilySemiBold,
        fontSize: 14,
        width: screenWidth * 0.8,
        textAlign: 'center'
    },
    customButton: {
        width: screenWidth * 0.8,
        height: 60,
        borderRadius: 15,
        backgroundColor: ColorsHelper.appColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: ColorsHelper.whiteClr,
        fontSize: 17,
        fontFamily: ConstantsHelper.fontFamilySemiBold
    }
});

function Started({ navigation }: any) {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../Assets/Images/women.png')}></Image>
            </View>
            <View style={styles.startedView}>
                <Text style={styles.headerTitle}>A new kind of language teacher</Text>
                <Text style={styles.subTitle}>Like talking to a real teacher anytime, at a fraction of the price</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
                    style={styles.customButton}
                ><Text style={styles.buttonText}>Get Started</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default Started