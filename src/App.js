import {Grid} from '@material-ui/core';
import React from 'react';
import Header from './components/Header.js';
import SongAdd from './components/SongAdd.js';
import SongList from './components/SongList.js';
import SongPlayer from './components/SongPlayer.js';

const App = () => {
	return (
		<>
			<Header/>
			<Grid container spacing={3}>
				<Grid item style={{paddingTop: '80px'}} xs={12} md={7}>
					<SongAdd/>
					<SongList/>
				</Grid>
				<Grid
					item
					style={{position: 'fixed', width: '100%', right: 0, top: '71px'}}
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
