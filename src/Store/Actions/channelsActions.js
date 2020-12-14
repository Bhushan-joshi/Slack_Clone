import * as actionTypes from './actionTypes';

export const setChannels = (channelInfo) => {
	return {
		type: actionTypes.SET_CHANNEL,
		payload: {
			channelInfo: channelInfo
		}
	}
}