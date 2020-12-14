import { combineReducers } from 'redux';
import {authReducer} from './authReducers';
import { channelReducer	 } from "./channelReducers";

const rootReducer = combineReducers({
	user: authReducer,
	channel:channelReducer
})

export default rootReducer