/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import {REACT_APP_API_KEY} from 'react-native-dotenv';
import FetchLocation from "./components/FetchLocation";
import {PermissionsAndroid} from 'react-native';
import GetLocation from 'react-native-get-location';
import axios from "axios"
import ShowLocation from "./components/ShowLocation";
import _ from 'lodash';
import Predictions from "./components/Predictions";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.getPredictionsDebounced = _.debounce(this.getPredictions, 200);
    }

    componentDidMount(): * {
        this.getUserLocation();
    }

    state = {
        isLoading: false,
        sunrise: 'Press GetLocation',
        sunset: 'Press GetLocation',
        city: "",
        predictions: []
    };

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    'title': 'React Sunrise Sunset Location Permission',
                    'message': 'React Sunrise Sunset App needs access to your current location '
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                if (GetLocation) {
                    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                        interval: 10000,
                        fastInterval: 5000
                    })
                        .then(data => {
                            this.setState({isLoading: true});
                            GetLocation.getCurrentPosition({
                                enableHighAccuracy: true,
                                timeout: 15000,
                            })
                                .then(location => {
                                    this.getSunriseInfo(location.latitude, location.longitude);
                                    this.getAddressByLocation(location.latitude, location.longitude);
                                })
                                .catch(error => {
                                    const {code, message} = error;
                                    console.warn(code, message);
                                });
                            // The user has accepted to enable the location services
                            // data can be :
                            //  - "already-enabled" if the location services has been already enabled
                            //  - "enabled" if user has clicked on OK button in the popup
                        }).catch(err => {
                        console.log(err)
                        // The user has not accepted to enable the location services or something went wrong during the process
                        // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                        // codes :
                        //  - ERR00 : The user has clicked on Cancel button in the popup
                        //  - ERR01 : If the Settings change are unavailable
                        //  - ERR02 : If the popup has failed to open
                    });
                } else {
                    console.log(navigator.geolocation);
                    alert("Nav is not supported")
                }
            } else {
                alert("Location permission denied");
            }
        } catch (err) {
            alert("err", err);
            console.warn(err)
        }
    }

    async getSunriseInfo(lat, lng) {
        axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`)
            .then(response => this.setState({
                isLoading: false,
                sunrise: response.data.results.sunrise.toString(),
                sunset: response.data.results.sunset.toString()
            })).catch(error => {
            this.setState({
                isLoading: false,
                sunrise: error.message,
                sunset: error.message
            })
        })
    }

    getUserLocation = () => {
        if (Platform.OS === 'android') {
            this.requestLocationPermission();
        } else {
            alert('IOS device found');
        }
    };

    getPredictions(city) {
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${REACT_APP_API_KEY}&input=${city}`)
            .then(response => this.setState({
                predictions: response.data.predictions
            })).catch(error => {
            this.setState({
                predictions: error.message.toArray()
            })
        })
    }

    getPlaceLocation(id) {
        axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${REACT_APP_API_KEY}&placeid=${id}`)
            .then(response => {
                this.getSunriseInfo(response.data.result.geometry.location.lat, response.data.result.geometry.location.lng)
            }).catch(error => {
            this.setState({
                isLoading: false,
                sunrise: error.message,
                sunset: error.message
            })
        })
    }

    getAddressByLocation(lat, lng) {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${REACT_APP_API_KEY}`)
            .then(response => {
                this.setState({city: response.data.results[0].formatted_address})
            }).catch(error => {
            this.setState({city: error.message})
        })
    }

    onChangeCity(city) {
        this.setState({city});
        this.getPredictionsDebounced(city);
    }

    onPredictionPress(id) {
        this.state.predictions.forEach(prediction => {
            if (prediction.id === id) {
                this.refs.input.blur();
                this.setState({
                    city: prediction.description,
                    predictions: [],
                    isLoading: true
                });
                this.getPlaceLocation(prediction.reference);
            }
        });
    }

    render() {
        return (
            <View style={styles.root}>
                <TextInput style={styles.materialUnderlineTextbox} ref='input' placeholder='Enter the city...'
                           value={this.state.city}
                           placeholderTextColor={"#FFFFFF"}
                           onChangeText={city => this.onChangeCity(city)}
                           onFocus={() => this.setState({city: ""})}/>
                <View style={styles.predictions}>
                    <Predictions onPredictionPress={this.onPredictionPress.bind(this)}
                                 predictions={this.state.predictions}/>
                </View>
                <ShowLocation state={this.state}/>
                <FetchLocation onGetLocation={this.getUserLocation.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: "rgba(111,185,143,1)",
        padding: 10,
    },
    materialUnderlineTextbox: {
        width: 360,
        height: 50,
        alignContent: 'center',
        color: "white",
        backgroundColor: "rgba(2,28,30,1)",
        borderRadius: 15,
        borderColor: "#000000",
        borderWidth: 1,
        borderStyle: "solid",
        overflow: "visible"
    },
    predictions: {
        position: 'absolute',
        top: 65,
        alignItems: 'center',
    }
});
