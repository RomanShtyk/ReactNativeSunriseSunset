/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createStackNavigator, createAppContainer} from 'react-navigation';
import SunsetScreen from "./screens/SunsetScreen";
import CounterScreen from "./screens/CounterScreen";

const MainNavigator = createStackNavigator({
    Sunset: {screen: SunsetScreen},
    Counter: {screen: CounterScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
