export function songReducer(state, action) {
	switch (action.type) {
		case 'PAUSE_SONG': {
			return {
				...state,
				isPlaying: false
			};
		}

		case 'PLAY_SONG': {
			return {
				...state,
				isPlaying: true
			};
		}

		case 'SET_SONG': {
			return {
				...state,
				song: action.payload.song
			};
		}

		default: {
			return state;
		}
	}
}
