import React from 'react';
import {Text, StyleSheet} from "react-native";

const FetchLocation = (props) => {
    return (
        <Text style={styles.button} onPress={props.onGetLocation}>{"Get my current location"}</Text>
    );

};
const styles = StyleSheet.create({
    button: {
        padding: 8,
        width: 360,
        height: 50,
        fontSize: 24,
        fontWeight: 'bold',
        bottom: 0,
        borderRadius: 15,
        textAlign: "center",
        alignContent: "center",
        backgroundColor: "rgba(2,28,30,1)",
        color: "white"
    }
});

export default FetchLocation;