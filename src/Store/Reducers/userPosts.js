import *as actionTypes from '../Actions/actionTypes';

const initialState={
	usersPosts:null,
}

export const PostReducer=(state=initialState,action)=>{
	switch (action.type) {
		case actionTypes.SET_USERS_POSTS:
			return{
				...state,
				usersPosts:action.payload.usersPosts
			}
		default:
			return state;
	}
}