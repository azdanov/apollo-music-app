import {Card, CardContent, CardMedia, IconButton, makeStyles, Slider, Typography} from '@material-ui/core';
import {PlayArrow, SkipNext, SkipPrevious} from '@material-ui/icons';
import React from 'react';
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
	const classes = useStyles();

	return (
		<>
			<Card variant="outlined" className={classes.container}>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography variant="h5" component="h3">
							Title
						</Typography>
						<Typography variant="subtitle1" component="p">
							Artist
						</Typography>
					</CardContent>
					<div className={classes.controls}>
						<IconButton>
							<SkipPrevious/>
						</IconButton>
						<IconButton>
							<PlayArrow className={classes.playIcon}/>
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
				<CardMedia
					className={classes.thumbnail}
					image="https://i.ytimg.com/an_webp/xo3yRQgggwY/mqdefault_6s.webp?du=3000&sqp=CPi204IG&rs=AOn4CLDtY5G7IVvWCTkR23B0j3ps7UvXlg"
				/>
			</Card>
			<SongPlaylist/>
		</>
	);
};

export default SongPlayer;
