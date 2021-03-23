import {useMutation} from '@apollo/client';
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
import {ADD_SONG} from '../graphql/mutations.js';

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

const initialSong = {
	title: '',
	duration: 0,
	thumbnail: '',
	artist: '',
	url: ''
};

const SongAdd = () => {
	const classes = useStyles();
	const [addSong, {error}] = useMutation(ADD_SONG);
	const [url, setUrl] = React.useState('');
	const [dialog, setDialog] = React.useState(false);
	const [playable, setPlayable] = React.useState(false);
	const [song, setSong] = React.useState(initialSong);
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

	async function handleAddSong() {
		const {url, thumbnail, duration, title, artist} = song;

		try {
			await addSong({
				variables: {
					url: url.length > 0 ? url : null,
					thumbnail: thumbnail.length > 0 ? thumbnail : null,
					duration: duration > 0 ? duration : null,
					title: title.length > 0 ? title : null,
					artist: artist.length > 0 ? artist : null
				}
			});
			handleCloseDialog();
			setSong(initialSong);
			setUrl('');
		} catch (error) {
			console.error('Error adding song', error);
		}
	}

	function handleError(field) {
		return error?.graphQLErrors[0].extensions.path.includes(field);
	}

	return (
		<div className={classes.container}>
			<Dialog className={classes.dialog} open={dialog} onClose={handleCloseDialog}>
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
						error={handleError('title')}
						helperText={handleError('title') && 'Field is required'}
						onChange={handleChangeSong}
					/>
					<TextField
						fullWidth
						margin="dense"
						name="artist"
						label="Artist"
						value={song.artist}
						error={handleError('artist')}
						helperText={handleError('artist') && 'Field is required'}
						onChange={handleChangeSong}
					/>
					<TextField
						fullWidth
						margin="dense"
						name="thumbnail"
						label="Thumbnail"
						value={song.thumbnail}
						error={handleError('thumbnail')}
						helperText={handleError('thumbnail') && 'Field is required'}
						onChange={handleChangeSong}
					/>
				</DialogContent>
				<DialogActions>
					<Button color="default" onClick={handleCloseDialog}>
						Cancel
					</Button>
					<Button color="primary" variant="contained" onClick={handleAddSong}>
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
