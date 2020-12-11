import * as actionTypes from '../Actions/actionTypes';
const initialState={
	currentUser:null,
	isloading:true
}

export const authReducer=(state=initialState,action)=>{
	switch (action.type) {
		case actionTypes.SET_USER:
			return{
				...state,
				currentUser:action.pyload.currentUser,
				isloading:false
			}
			
		default:
			return state;
	}
}