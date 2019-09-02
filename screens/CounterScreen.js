/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React from "react";
import Counter from "../components/Counter";
import { createStore } from "redux";
import { Provider } from "react-redux";

export default class CounterScreen extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Counter />
      </Provider>
    );
  }
}

const initialState = {
  counter: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE_COUNTER":
      return { counter: state.counter + 1 };
    case "DECREASE_COUNTER":
      return { counter: state.counter - 1 };
  }
  return state;
};

const store = createStore(reducer);
