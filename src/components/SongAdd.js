import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputAdornment,
	makeStyles,
	TextField,
	useMediaQuery
} from '@material-ui/core';
import {Link} from '@material-ui/icons';
import React from 'react';
import ReactPlayer from 'react-player';
import SoundCloudPlayer from 'react-player/lib/players/SoundCloud';
import YouTubePlayer from 'react-player/lib/players/YouTube';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		margin: theme.spacing(1)
	},
	urlInput: {
		margin: theme.spacing(1)
	},
	songAddButton: {
		margin: theme.spacing(1)
	},
	dialog: {
		textAlign: 'center'
	},
	thumbnail: {
		width: '90%'
	}
}));

function getYoutubeInfo(player) {
	const duration = player.getDuration();
	const {title, video_id, author} = player.getVideoData();
	const thumbnail = `https://img.youtube.com/vi/${video_id}/0.jpg`;

	return {title, duration, thumbnail, artist: author};
}

function getSoundCloudInfo(player) {
	return new Promise(resolve => {
		player.getCurrentSound(songData => {
			if (songData) {
				resolve({
					title: songData.title,
					duration: Number(songData.duration / 1000),
					thumbnail: songData.artwork_url.replace('-large', '-t500x500'),
					artist: songData.user.username
				});
			}
		});
	});
}

const SongAdd = () => {
	const classes = useStyles();
	const [url, setUrl] = React.useState('');
	const [dialog, setDialog] = React.useState(false);
	const [playable, setPlayable] = React.useState(false);
	const [song, setSong] = React.useState({
		title: '',
		duration: 0,
		thumbnail: '',
		artist: '',
		url: ''
	});
	const smallPlus = useMediaQuery(theme => theme.breakpoints.up('sm'));

	React.useEffect(() => {
		setPlayable(YouTubePlayer.canPlay(url) || SoundCloudPlayer.canPlay(url));
	}, [url]);

	function handleCloseDialog() {
		setDialog(false);
	}

	async function handlePrepareSong({player}) {
		const nestedPlayer = player.player.player;
		let songData;

		if (nestedPlayer.getVideoData) {
			songData = getYoutubeInfo(nestedPlayer);
		} else if (nestedPlayer.getCurrentSound) {
			songData = await getSoundCloudInfo(nestedPlayer);
		}

		setSong({...songData, url});
	}

	function handleChangeSong(event) {
		const {name, value} = event.target;
		setSong(previousSong => ({
			...previousSong,
			[name]: value
		}));
	}

	return (
		<div className={classes.container}>
			<Dialog
				className={classes.dialog}
				open={dialog}
				onClose={handleCloseDialog}
			>
				<DialogTitle>Edit Song</DialogTitle>
				<DialogContent>
					<img
						style={{width: '100%'}}
						src={song.thumbnail}
						alt="Song thumbnail"
						className={classes.thumbnail}
					/>
					<TextField
						fullWidth
						margin="dense"
						name="title"
						label="Title"
						value={song.title}
						onChange={handleChangeSong}
					/>
					<TextField
						fullWidth
						margin="dense"
						name="artist"
						label="Artist"
						value={song.artist}
						onChange={handleChangeSong}
					/>
					<TextField
						fullWidth
						margin="dense"
						name="thumbnail"
						label="Thumbnail"
						value={song.thumbnail}
						onChange={handleChangeSong}
					/>
				</DialogContent>
				<DialogActions>
					<Button color="default" onClick={handleCloseDialog}>
						Cancel
					</Button>
					<Button color="primary" variant="contained">
						Save
					</Button>
				</DialogActions>
			</Dialog>
			<TextField
				fullWidth
				className={classes.urlInput}
				value={url}
				placeholder="Insert Youtube/Soundcloud link"
				margin="normal"
				type="url"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Link/>
						</InputAdornment>
					)
				}}
				onChange={event => setUrl(event.target.value)}
			/>
			<Button
				className={classes.songAddButton}
				variant={smallPlus ? 'outlined' : 'contained'}
				color="primary"
				disabled={!playable}
				onClick={() => setDialog(true)}
			>
				Add
			</Button>
			<ReactPlayer hidden url={url} onReady={handlePrepareSong}/>
		</div>
	);
};

export default SongAdd;
