import { combineReducers } from 'redux';
import {authReducer} from './authReducers';
import { channelReducer	 } from "./channelReducers";
import { PostReducer } from "./userPosts";

const rootReducer = combineReducers({
	user: authReducer,
	channel:channelReducer,
	posts:PostReducer
})

export default rootReducer