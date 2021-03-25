import {Grid, Hidden, useMediaQuery} from '@material-ui/core';
import React from 'react';
import Header from './components/Header.js';
import SongAdd from './components/SongAdd.js';
import SongList from './components/SongList.js';
import SongPlayer from './components/SongPlayer.js';
import {songReducer} from './reducers.js';

export const SongContext = React.createContext({
	song: {
		id: 'b67719a1-246c-4a7b-8df7-8e75b051f69b',
		artist: 'Deniro Farrar',
		title: 'King feat. Trent the HOOLiGAN (Official Video)',
		thumbnail: 'https://i.ytimg.com/vi/YLG7jMROoQE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBviTCJ1QNdIuTh4t1mmAUEPE717Q',
		url: 'https://www.youtube.com/watch?v=YLG7jMROoQE',
		duration: 250
	},
	isPlaying: false
});

const App = () => {
	const initialSongState = React.useContext(SongContext);
	const [state, dispatch] = React.useReducer(songReducer, initialSongState);

	const smallPlus = useMediaQuery(theme => theme.breakpoints.up('sm'));
	const mediumPlus = useMediaQuery(theme => theme.breakpoints.up('md'));

	const songState = React.useMemo(() => ({state, dispatch}), [state]);

	return (
		<SongContext.Provider value={songState}>
			<Hidden only="xs">
				<Header/>
			</Hidden>
			<Grid container spacing={3}>
				<Grid item style={{paddingTop: smallPlus ? 80 : 10}} xs={12} md={7}>
					<SongAdd/>
					<SongList/>
				</Grid>
				<Grid
					item
					style={
						mediumPlus ?
							{position: 'fixed', width: '100%', right: 0, top: '71px'} :
							{position: 'fixed', width: '100%', left: 0, bottom: 0}
					}
					xs={12}
					md={5}
				>
					<SongPlayer/>
				</Grid>
			</Grid>
		</SongContext.Provider>
	);
};

export default App;
