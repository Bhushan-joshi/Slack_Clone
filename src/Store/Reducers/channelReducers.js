import * as actionTypes from '../Actions/actionTypes';

const initialState={
	currentChannel:null
}

export const channelReducer=(state=initialState,action)=>{
	switch (action.type) {
		case actionTypes.SET_CHANNEL:
			return{
				currentChannel:action.payload.channelInfo
			}	
		default:
			return state;
	}
}