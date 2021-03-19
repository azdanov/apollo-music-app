import {CircularProgress} from '@material-ui/core';
import React from 'react';
import Song from './Song.js';

const SongList = () => {
	const loading = false;

	const song = {
		artist: 'The Midnight',
		title: '\'Ghost in Your Stereo\' (Official Lyric Video)',
		thumbnail:
			'https://i.ytimg.com/an_webp/xo3yRQgggwY/mqdefault_6s.webp?du=3000&sqp=CPi204IG&rs=AOn4CLDtY5G7IVvWCTkR23B0j3ps7UvXlg'
	};

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 50
				}}
			>
				<CircularProgress/>
			</div>
		);
	}

	return (
		<>
			{Array.from({length: 10}, () => song).map((song, index) => (
				<Song key={index} {...song}/>
			))}
		</>
	);
};

export default SongList;
