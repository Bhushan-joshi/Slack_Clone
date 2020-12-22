import { combineReducers } from 'redux';
import {authReducer} from './authReducers';
import { channelReducer	 } from "./channelReducers";
import { colorsReducer } from './colors';
import { PostReducer } from "./userPosts";

const rootReducer = combineReducers({
	user: authReducer,
	channel:channelReducer,
	posts:PostReducer,
	color:colorsReducer
})

export default rootReducer