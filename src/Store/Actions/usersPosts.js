import * as actionTypes from './actionTypes';

export const setUsersPosts = usersPosts => {
	return {
		type: actionTypes.SET_USERS_POSTS,
		payload: {
			usersPosts
		}
	}
}