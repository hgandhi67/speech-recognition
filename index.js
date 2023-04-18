/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import Route from './src/Router/Route';
import Splash from './src/SplashScreen/Splash';
import React, { Component } from 'react';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 'splashScreen',
        }
    }

    componentDidMount() {
        global.logged = false;
        global.notLogin = false;
        
        setTimeout(() => {
            this.setState({ screen: 'nav' })
        }, 3000);
    }

    render() {
        return (
            this.state.screen === 'splashScreen' ? <Splash /> : <Route />
        )
    }
}

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
