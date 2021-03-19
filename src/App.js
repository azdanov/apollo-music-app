import {Grid, useMediaQuery, Hidden} from '@material-ui/core';
import React from 'react';
import Header from './components/Header.js';
import SongAdd from './components/SongAdd.js';
import SongList from './components/SongList.js';
import SongPlayer from './components/SongPlayer.js';

const App = () => {
	const smallPlus = useMediaQuery(theme => theme.breakpoints.up('sm'));
	const mediumPlus = useMediaQuery(theme => theme.breakpoints.up('md'));

	return (
		<>
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
		</>
	);
};

export default App;
