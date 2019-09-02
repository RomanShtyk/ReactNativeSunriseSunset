/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React from "react";
import { Text } from "react-native";

const Predictions = props =>
  props.predictions.map(prediction => (
    <Text
      style={predictionsStyle}
      key={prediction.id}
      onPress={() => props.onPredictionPress(prediction.id)}
    >
      {prediction.description}
    </Text>
  ));

const predictionsStyle = {
  width: 360,
  borderStyle: "solid",
  borderWidth: 1,
  height: 40,
  color: "white",
  backgroundColor: "rgba(44,120,115,1)"
};

export default Predictions;
