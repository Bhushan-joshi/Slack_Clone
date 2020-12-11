import { combineReducers } from 'redux';
import {authReducer} from './authReducers';

const rootReducer = combineReducers({
	user: authReducer
})

export default rootReducer