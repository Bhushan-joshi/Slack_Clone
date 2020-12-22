import *as actionTypes from './actionTypes';


export const setColors=(primary,secondary)=>{
	return{
		type:actionTypes.SET_COLOR,
		payload:{
			primary,
			secondary
		}
	}
}