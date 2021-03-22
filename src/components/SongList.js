import {useQuery} from '@apollo/client';
import {CircularProgress} from '@material-ui/core';
import React from 'react';
import {GET_SONGS} from '../graphql/queries.js';
import Song from './Song.js';

const SongList = () => {
	const {data, loading, error} = useQuery(GET_SONGS);

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

	if (error) {
		return <div>Error getting songs list</div>;
	}

	return (
		<>
			{data.songs.map(song => (
				<Song key={song.id} {...song}/>
			))}
		</>
	);
};

export default SongList;
