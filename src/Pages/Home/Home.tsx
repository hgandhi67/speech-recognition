import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    Slider,
    ImageBackground,
    StatusBar,
    useColorScheme,
} from 'react-native';

// import Voice
import Voice from '@react-native-community/voice';
import ColorsHelper from '../../Helpers/ColorsHelper';
import { screenHeight, screenWidth } from '../../Helpers/Utils';
import ConstantsHelper from '../../Helpers/ConstantsHelper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        // padding: 5,
    },
    tryAgainBtn: {
        width: screenWidth * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 16,
        backgroundColor: ColorsHelper.appColor,
        marginTop: 25,
    },
    continueBtn: {
        width: screenWidth * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 16,
        backgroundColor: ColorsHelper.green,
        marginTop: 25
    },
    tryAgainText: {
        fontFamily: ConstantsHelper.fontFamilySemiBold,
        color: ColorsHelper.whiteClr
    },
    micView: {
        position: 'absolute',
        bottom: -30,
        backgroundColor: ColorsHelper.appColor,
        height: 60,
        width: 60,
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    micImg: {
        height: 24,
        width: 18
    },
    bgImage: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        // left: 0,
        minHeight: screenHeight * 0.4,
        // backgroundColor: 'red',
        width: screenWidth,
        alignItems: 'center'
    }
});

function Home({ navigation }: any) {
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);
    const [partialResults, setPartialResults] = useState<any>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [rondomNo, setRandomNo] = useState(1);
    const [recordVoice, setRecordVoice] = useState('');
    const [currentSentence, setCurrentSentence] = useState<any>();
    
    const sentences: any = [
        { eng: 'Hello how are you', span: 'Hello how are you' },
        { eng: 'Hello how are you', span: 'Hello how are you' },
        { eng: 'Hello how are you', span: 'Hello how are you' },
        { eng: 'Hello how are you', span: 'Hello how are you' },
        { eng: 'Hello how are you', span: 'Hola ¿cómo estás?' },
        { eng: 'I really like Mexican food.', span: 'Me gusta mucho la comida mexicana.' },
        { eng: 'Where is the bathroom?', span: '¿Dónde está el baño?' },
        { eng: "I don't understand what you're saying.", span: 'No entiendo lo que estás diciendo.' },
        { eng: "I have a doctor's appointment tomorrow.", span: 'Mañana tengo una cita con el médico.' },
        { eng: 'Can you help me, please?', span: '¿Puedes ayudarme, por favor?' },
        { eng: 'I love to travel and visit new places.', span: 'Me encanta viajar y conocer nuevos lugares.' },
        { eng: 'My favorite color is blue.', span: 'Mi color favorito es el azul.' },
        { eng: 'How old are you?', span: '¿Cuántos años tienes?' },
        { eng: "Tonight, I'm going to the movies with my friends.", span: 'Esta noche voy al cine con mis amigos.' }
    ];
    useEffect(() => {
        let rondom = Math.floor(Math.random() * 9) + 1
        setCurrentSentence(sentences[rondom])
        setRandomNo(rondom)
        // console.log("ssss]::", sentences[rondom], rondom)
    }, [])

    // useEffect(() => {
    //   if(currentSentence == undefined) {
    //     let rondom = Math.floor(Math.random() * 9) + 1
    //     // setCurrentSentence(sentences[rondom])
    //     setRandomNo(rondom)
    //   }
    // console.log("currentSentence update:", currentSentence)
    // }, [currentSentence])

    // useEffect(() => {
    //     setCurrentSentence(sentences[rondomNo])
    // }, [rondomNo])
    
    
    
    useEffect(() => {
        //Setting callbacks for the process status
        

        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
        return () => {
            //destroy the process after switching the screen
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechStart = (e: any) => {
        //Invoked when .start() is called without error
        // console.log('onSpeechStart: ', e);
        // setStarted('√');
    };

    const onSpeechEnd = (e: any) => {
        //Invoked when SpeechRecognizer stops recognition
        // console.log('onSpeechEnd: ', e);
        // setEnd('√');
    };

    const onSpeechError = (e: any) => {
        setCurrentStep(4)
        //Invoked when an error occurs.
        // console.log('onSpeechError: ', e);
        setError(JSON.stringify(e.error));
    };

    const onSpeechResults = (e: any) => {
        //Invoked when SpeechRecognizer is finished recognizing

        let data = e.value
        setResults(data)
       
    };

    useEffect(() => {
        if(results.length != 0) {

            setCurrentStep(3)
            let currentData : any = currentSentence?.span
            // console.log('onSpeechResults: ',results, currentData?.toLowerCase());
            if (results?.includes(currentData?.toLowerCase())) {
                setRecordVoice("")
                setCurrentStep(3)
            } else {
                // setRecordVoice("")
                setCurrentStep(4)
            }
        }
      
    }, [results])
    


    const onSpeechPartialResults = (e: any) => {
        //Invoked when any results are computed
        
        setPartialResults(e.value);
    };

    useEffect(() => {
        if(partialResults != undefined) {

            let data = partialResults
            // console.log("currentSentence::", getCurrentSentence(), data)
            let currentData = currentSentence?.span.toLowerCase()
            for (let i = 0; i < data.length; i++) {
                if (currentData?.startsWith(data[i]?.toLowerCase())) {
                    setRecordVoice(data[i])
                }
            }
        //   console.log("partialResults::", currentSentence,rondomNo, partialResults )
        }
    }, [partialResults])
    

    const onSpeechVolumeChanged = (e: any) => {
        //Invoked when pitch that is recognized changed
        // console.log('onSpeechVolumeChanged: ', e);
        setPitch(e.value);
    };

    const startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        try {
            await Voice.start('en-ES');
            setPitch('');
            setError('');
            setStarted('');
            setResults([]);
            setPartialResults([]);
            setEnd('');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const isDarkMode = useColorScheme() === 'dark';
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={ColorsHelper.white2}
            />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                    <Image source={require("../../Assets/Images/x.png")} />
                    </TouchableOpacity>
                    <Slider
                        style={{
                            width: screenWidth * 0.8,
                            height: 20
                        }}
                        disabled
                        maximumValue={10}
                        minimumValue={0}
                        step={1}
                        value={currentStep == 1 ? 2 : currentStep == 2 ? 5 : 10}
                        minimumTrackTintColor={ColorsHelper.whiteClr}
                        maximumTrackTintColor={ColorsHelper.appColor}
                        thumbTintColor={ColorsHelper.appColor} />
                </View>
                <View>
                    <Image source={require('../../Assets/Images/women.png')}></Image>
                </View>
                <ImageBackground style={styles.bgImage}
                    source={currentStep == 1 ? require('../../Assets/Images/right1.png') : currentStep == 2 ? require('../../Assets/Images/image6.png') : currentStep == 3 ? require('../../Assets/Images/greenGradient.png') : require('../../Assets/Images/red.png')} //image6.png
                    resizeMode={currentStep == 1 ? 'center' : 'cover'}
                >
                    {/* <Image  /> */}
                    <View style={{
                        backgroundColor: ColorsHelper.whiteClr,
                        width: screenWidth * 0.8,
                        minHeight: screenHeight * 0.20,
                        alignSelf: 'center',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 12,

                    }}>
                        {currentStep == 3 &&
                            <View style={{ position: 'absolute', top: -30, }}>
                                <Image source={require('../../Assets/Images/right.png')} style={{ height: 73, width: 100 }} />
                                <View style={{ backgroundColor: ColorsHelper.green, height: 44, width: 44, position: 'absolute', borderRadius: 25, left: 27, top: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../Assets/Images/right1.png')} />
                                </View>
                            </View>
                        }
                        {currentStep == 2 &&
                            <Text style={{ fontFamily: ConstantsHelper.fontFamily, marginTop: 20 }}>Speak now...</Text>
                        }
                        {currentStep == 4 &&
                            <Text style={{ fontFamily: ConstantsHelper.fontFamily, marginTop: 20 }}>LET’S TRY AGAIN</Text>
                        }
                        {currentStep == 3 ?
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontFamily: ConstantsHelper.fontFamilySemiBold, marginTop: 30, fontSize: 18, color: ColorsHelper.green }}>WELL DONE!</Text>
                                <Text style={{ fontSize: 16, fontFamily: ConstantsHelper.fontFamilySemiBold, marginTop: 10, color: ColorsHelper.green, backgroundColor: ColorsHelper.green2, borderRadius: 5, padding: 5 }}>{currentSentence?.span}</Text>
                            </View>
                            :
                            <Text style={{ fontSize: 16, fontFamily: ConstantsHelper.fontFamilySemiBold, marginTop: 30, textAlign: 'center' }}><Image source={require('../../Assets/Images/speaker.png')} /><Text style={{ color: ColorsHelper.appColor, fontSize: 16 }}>{recordVoice}</Text>{currentSentence?.span?.toLowerCase()?.replace(recordVoice, "")}</Text>
                        }
                        {currentStep == 1 &&
                            <Text style={{ fontFamily: ConstantsHelper.fontFamily }}>{currentSentence?.eng}</Text>
                        }
                        {currentStep == 1 &&
                            <View style={styles.micView}>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => {
                                        setRecordVoice("")
                                        startRecognizing()
                                        setCurrentStep(2)
                                    }}
                                >
                                    <View
                                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
                                    >

                                        <Image source={require('../../Assets/Images/mic.png')} style={styles.micImg} />

                                    </View>
                                </TouchableOpacity>
                            </View>

                        }
                    </View>
                    {currentStep == 2 &&
                        <View style={{ flex: 1, marginTop: 30 }}>
                            <Image source={require("../../Assets/Images/wav.png")} style={{ width: screenWidth * 0.8, tintColor: ColorsHelper.whiteClr, height: 80, resizeMode: 'contain' }} />
                        </View>
                    }
                    {currentStep == 3 &&
                        <TouchableOpacity
                            onPress={() => {
                                let data = currentSentence
                                let newSent = sentences[Math.floor(Math.random() * 9) + 1]
                                if (newSent.eng != data.eng) {
                                    setCurrentSentence(newSent)
                                } else {
                                    setCurrentSentence(sentences[Math.floor(Math.random() * 9) + 1])
                                }
                                setCurrentStep(1)
                            }}
                            style={styles.continueBtn}>
                            <Text style={styles.tryAgainText}>CONTINUE</Text>
                        </TouchableOpacity>
                    }
                    {currentStep == 4 &&
                        <TouchableOpacity style={styles.tryAgainBtn}
                            onPress={() => {
                                setRecordVoice("")
                                setCurrentStep(1)
                            }}
                        >
                            <Text style={styles.tryAgainText}><Image source={require('../../Assets/Images/tryagain.png')} /> TRY AGAIN</Text>
                        </TouchableOpacity>
                    }
                </ImageBackground>

            </View>
        </SafeAreaView>
    );
};

export default Home