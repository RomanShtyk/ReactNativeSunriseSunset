/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

const ShowLocation = props => {
  if (props.state.isLoading) {
    return (
      <View style={styles.root}>
        <Text style={styles.text}>Sunrise Time:</Text>
        <View style={styles.viewStyle}>
          <Progress.Circle
            size={50}
            indeterminate={true}
            borderWidth={5}
            color={"rgba(255,255,102,1)"}
          />
        </View>
        <Text style={styles.text}>Sunset Time:</Text>
        <View style={styles.viewStyle}>
          <Progress.Circle
            size={50}
            indeterminate={true}
            borderWidth={5}
            color={"rgba(255,255,102,1)"}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Sunrise Time:</Text>
      <Text style={styles.text}>{props.state.sunrise}</Text>
      <Text style={styles.text}>Sunset Time:</Text>
      <Text style={styles.text}>{props.state.sunset}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: 360,
    height: 300,
    position: "absolute",
    bottom: 75,
    backgroundColor: "rgba(0,68,69,1)",
    borderRadius: 15
  },
  text: {
    fontSize: 30,
    margin: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  viewStyle: {
    alignItems: "center"
  }
});
export default ShowLocation;
