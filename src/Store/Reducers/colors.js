import { SET_COLOR } from "../Actions/actionTypes";

const initialState={
	primary:'#4c3c4c',
	secondary:'#eee',
}

export const colorsReducer=(state=initialState,actions)=>{
	switch (actions.type) {
		case SET_COLOR:
			return{
				primary:actions.payload.primary,
				secondary:actions.payload.secondary,
			}
		default:
			return state
	}
}