import { createStore, applyMiddleware } from "redux";

// Logger with default options
import logger from "redux-logger";

import travelTo from "./Reducers";

export default function configureStore(initialState) {
  const store = createStore(travelTo, initialState, applyMiddleware(logger));
  return store;
}