import {useMutation} from '@apollo/client';
import {Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography} from '@material-ui/core';
import {Pause, PlayArrow, PlaylistAdd} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import {SongContext} from '../App.js';
import {ADD_OR_REMOVE_FROM_PLAYLIST} from '../graphql/mutations.js';

const useStyles = makeStyles(theme => ({
	container: {
		margin: theme.spacing(2)
	},
	songInfoContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	songInfo: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between'
	},
	thumbnail: {
		objectFit: 'cover',
		width: 140,
		height: 140
	}
}));

const Song = ({song}) => {
	const classes = useStyles();

	const [addOrRemoveFromPlaylist] = useMutation(ADD_OR_REMOVE_FROM_PLAYLIST, {
		onCompleted: data => {
			localStorage.setItem('playlist', JSON.stringify(data.addOrRemoveFromPlaylist));
		}
	});

	const {state, dispatch} = React.useContext(SongContext);
	const [isPlaying, setIsPlaying] = React.useState(false);

	React.useEffect(() => {
		const isSongPlaying = song.id === state.song.id && state.isPlaying;
		setIsPlaying(isSongPlaying);
	}, [song.id, state.isPlaying, state.song.id]);

	function handleTogglePlay() {
		dispatch({type: 'SET_SONG', payload: {song}});
		dispatch(state.isPlaying ? {type: 'PAUSE_SONG'} : {type: 'PLAY_SONG'});
	}

	function handleAddOrRemoveFromPlaylist() {
		addOrRemoveFromPlaylist({variables: {input: {...song, __typename: 'Song'}}});
	}

	return (
		<Card className={classes.container}>
			<div className={classes.songInfoContainer}>
				<CardMedia image={song.thumbnail} className={classes.thumbnail}/>
				<div className={classes.songInfo}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{song.title}
						</Typography>
						<Typography gutterBottom variant="body1" component="p" color="textSecondary">
							{song.artist}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton size="small" color="primary" onClick={handleTogglePlay}>
							{isPlaying ? <Pause/> : <PlayArrow/>}
						</IconButton>
						<IconButton size="small" color="primary" onClick={handleAddOrRemoveFromPlaylist}>
							<PlaylistAdd/>
						</IconButton>
					</CardActions>
				</div>
			</div>
		</Card>
	);
};

Song.propTypes = {
	song: PropTypes.shape({
		id: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		thumbnail: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	}).isRequired
};

export default Song;
