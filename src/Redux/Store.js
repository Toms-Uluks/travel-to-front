import { createStore, applyMiddleware } from "./node_modules/redux";

// Logger with default options
import logger from "./node_modules/redux-logger";

import travelTo from "./Reducers/user";

const store = createStore(travelTo, applyMiddleware(logger));
export default store;
