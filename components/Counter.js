/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

class Counter extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewStyle}>
          <TouchableOpacity onPress={() => this.props.increaseCounter()}>
            <Text style={styles.textStyle}>Increase</Text>
          </TouchableOpacity>
          <Text style={styles.textStyle}>{this.props.counter}</Text>
          <TouchableOpacity onPress={() => this.props.decreaseCounter()}>
            <Text style={styles.textStyle}>Decrease</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: { fontSize: 20 },
  viewStyle: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-around"
  }
});

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCounter: () => dispatch({ type: "INCREASE_COUNTER" }),
    decreaseCounter: () => dispatch({ type: "DECREASE_COUNTER" })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
