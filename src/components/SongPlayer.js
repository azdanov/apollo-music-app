import {useQuery} from '@apollo/client';
import {Card, CardContent, CardMedia, IconButton, makeStyles, Slider, Typography} from '@material-ui/core';
import {Pause, PlayArrow, SkipNext, SkipPrevious} from '@material-ui/icons';
import React from 'react';
import {SongContext} from '../App.js';
import {GET_PLAYLIST} from '../graphql/queries';
import SongPlaylist from './SongPlaylist.js';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0px 15px'
	},
	content: {
		flex: '1 0 auto'
	},
	thumbnail: {
		width: 150
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1)
	},
	playIcon: {
		height: 38,
		width: 38
	}
}));

const SongPlayer = () => {
	const {data} = useQuery(GET_PLAYLIST);
	const {state, dispatch} = React.useContext(SongContext);
	const classes = useStyles();

	function handleTogglePlay() {
		dispatch(state.isPlaying ? {type: 'PAUSE_SONG'} : {type: 'PLAY_SONG'});
	}

	return (
		<>
			<Card variant="outlined" className={classes.container}>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography variant="h5" component="h3">
							{state.song.title}
						</Typography>
						<Typography variant="subtitle1" component="p">
							{state.song.artist}
						</Typography>
					</CardContent>
					<div className={classes.controls}>
						<IconButton>
							<SkipPrevious/>
						</IconButton>
						<IconButton onClick={handleTogglePlay}>
							{state.isPlaying ? (
								<Pause className={classes.playIcon}/>
							) : (
								<PlayArrow className={classes.playIcon}/>
							)}
						</IconButton>
						<IconButton>
							<SkipNext/>
						</IconButton>
						<Typography variant="subtitle1" component="p">
							00:01:29
						</Typography>
					</div>
					<Slider type="range" min={0} max={1} step={0.01}/>
				</div>
				<CardMedia className={classes.thumbnail} image={state.song.thumbnail}/>
			</Card>
			<SongPlaylist playlist={data.playlist}/>
		</>
	);
};

export default SongPlayer;
