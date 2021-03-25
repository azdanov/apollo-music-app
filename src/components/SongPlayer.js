import {useQuery} from '@apollo/client';
import {
	Card,
	CardContent,
	CardMedia,
	IconButton,
	makeStyles,
	Slider,
	Typography
} from '@material-ui/core';
import {Pause, PlayArrow, SkipNext, SkipPrevious} from '@material-ui/icons';
import React from 'react';
import {SongContext} from '../App.js';
import {GET_PLAYLIST} from '../graphql/queries.js';
import SongPlaylist from './SongPlaylist.js';
import ReactPlayer from 'react-player';

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
	const [played, setPlayed] = React.useState(0);
	const [playedSeconds, setPlayedSeconds] = React.useState(0);
	const [seeking, setSeeking] = React.useState(false);
	const [positionInPlaylist, setPositionInPlaylist] = React.useState(0);
	const reactPlayerRef = React.useRef();
	const classes = useStyles();

	React.useEffect(() => {
		const songIndex = data.playlist.findIndex(song => song.id === state.song.id);
		setPositionInPlaylist(songIndex);
	}, [data.playlist, state.song.id]);

	React.useEffect(() => {
		const nextSong = data.playlist[positionInPlaylist + 1];
		if (played >= 0.99 && nextSong) {
			setPlayed(0);
			dispatch({type: 'SET_SONG', payload: {song: nextSong}});
		}
	}, [data.playlist, dispatch, played, positionInPlaylist]);

	function handleTogglePlay() {
		dispatch(state.isPlaying ? {type: 'PAUSE_SONG'} : {type: 'PLAY_SONG'});
	}

	function handleProgressChange(event, newValue) {
		setPlayed(newValue);
	}

	function setSeekMouseUp() {
		setSeeking(false);
		reactPlayerRef.current.seekTo(played);
	}

	function setSeekMouseDown() {
		setSeeking(true);
	}

	function formatDuration(seconds) {
		return new Date(seconds * 1000).toISOString().slice(11, 19);
	}

	function handlePlayNextSong() {
		const nextSong = data.playlist[positionInPlaylist + 1];

		if (nextSong) {
			setPlayed(0);
			dispatch({type: 'SET_SONG', payload: {song: nextSong}});
		}
	}

	function handlePlayPreviousSong() {
		const previousSong = data.playlist[positionInPlaylist - 1];

		if (previousSong) {
			setPlayed(0);
			dispatch({type: 'SET_SONG', payload: {song: previousSong}});
		}
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
						<IconButton onClick={handlePlayPreviousSong}>
							<SkipPrevious/>
						</IconButton>
						<IconButton onClick={handleTogglePlay}>
							{state.isPlaying ? (
								<Pause className={classes.playIcon}/>
							) : (
								<PlayArrow className={classes.playIcon}/>
							)}
						</IconButton>
						<IconButton onClick={handlePlayNextSong}>
							<SkipNext/>
						</IconButton>
						<Typography variant="subtitle1" component="p">
							{formatDuration(playedSeconds)}
						</Typography>
					</div>
					<Slider
						value={played}
						type="range"
						min={0}
						max={1}
						step={0.01}
						onMouseUp={setSeekMouseUp}
						onMouseDown={setSeekMouseDown}
						onChange={handleProgressChange}
					/>
				</div>
				<ReactPlayer
					ref={reactPlayerRef}
					hidden
					url={state.song.url}
					playing={state.isPlaying}
					onProgress={({played, playedSeconds}) => {
						setPlayedSeconds(playedSeconds);
						if (!seeking) {
							setPlayed(played);
						}
					}}
				/>
				<CardMedia className={classes.thumbnail} image={state.song.thumbnail}/>
			</Card>
			<SongPlaylist playlist={data.playlist}/>
		</>
	);
};

export default SongPlayer;
