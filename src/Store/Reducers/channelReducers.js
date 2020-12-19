import * as actionTypes from '../Actions/actionTypes';

const initialState={
	currentChannel:null,
	isPrivateChannel:false
}

export const channelReducer=(state=initialState,action)=>{
	switch (action.type) {
		case actionTypes.SET_CHANNEL:
			return{
				currentChannel:action.payload.channelInfo
			}	
		case actionTypes.SET_PRIVATE_CHANNEL:
			return{
				...state,
				isPrivateChannel:action.payload.isPrivateChannel
			}
		default:
			return state;
	}
}