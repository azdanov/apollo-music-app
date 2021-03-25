import {useMutation} from '@apollo/client';
import {Avatar, IconButton, makeStyles, Typography, useMediaQuery} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import {ADD_OR_REMOVE_FROM_PLAYLIST} from '../graphql/mutations.js';

const useStyles = makeStyles({
	avatar: {
		width: 44,
		height: 44
	},
	text: {
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},
	container: {
		display: 'grid',
		gridAutoFlow: 'column',
		gridTemplateColumns: '50px auto 50px',
		gridGap: 12,
		alignItems: 'center',
		marginTop: 10
	},
	songInfoContainer: {
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	}
});

const PlaylistItem = song => {
	const classes = useStyles();

	const [addOrRemoveFromPlaylist] = useMutation(ADD_OR_REMOVE_FROM_PLAYLIST, {
		onCompleted: data => {
			localStorage.setItem('playlist', JSON.stringify(data.addOrRemoveFromPlaylist));
		}
	});

	function handleAddOrRemoveFromPlaylist() {
		addOrRemoveFromPlaylist({variables: {input: {...song, __typename: 'Song'}}});
	}

	return (
		<div className={classes.container}>
			<Avatar src={song.thumbnail} alt="Song thumbnail" className={classes.avatar}/>
			<div className={classes.songInfoContainer}>
				<Typography variant="subtitle2" className={classes.text}>
					{song.title}
				</Typography>
				<Typography variant="body2" className={classes.text}>
					{song.artist}
				</Typography>
			</div>
			<IconButton onClick={handleAddOrRemoveFromPlaylist}>
				<Delete color="error"/>
			</IconButton>
		</div>
	);
};

PlaylistItem.propTypes = {
	song: PropTypes.shape({
		id: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		thumbnail: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	})
};

const SongPlaylist = ({playlist}) => {
	const mediumPlus = useMediaQuery(theme => theme.breakpoints.up('md'));

	if (!mediumPlus) {
		return null;
	}

	return (
		<div style={{margin: '10px 0'}}>
			<Typography color="textSecondary" variant="button">
				Queue ({playlist.length})
			</Typography>
			{playlist.map(song => (
				<PlaylistItem key={song.id} {...song}/>
			))}
		</div>
	);
};

SongPlaylist.propTypes = {
	playlist: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			artist: PropTypes.string.isRequired,
			thumbnail: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		})
	).isRequired
};

export default SongPlaylist;
