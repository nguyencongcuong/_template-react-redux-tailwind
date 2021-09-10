import counterReducer from "./counter.js";
import {combineReducers} from "redux";

const reducers = combineReducers({
	counter: counterReducer
})

export default reducers
