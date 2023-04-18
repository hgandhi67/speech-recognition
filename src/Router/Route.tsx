import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from "react";
import Home from "../Pages/Home/Home";
import Started from "../Pages/Others/Started";

const Stack = createNativeStackNavigator<any>();
const Route = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Started">
                <Stack.Screen name="Started" component={Started} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route;