import {Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography} from '@material-ui/core';
import {PlayArrow, PlaylistAdd} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

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

const Song = ({artist, title, thumbnail}) => {
	const classes = useStyles();

	return (
		<Card className={classes.container}>
			<div className={classes.songInfoContainer}>
				<CardMedia image={thumbnail} className={classes.thumbnail}/>
				<div className={classes.songInfo}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{title}
						</Typography>
						<Typography
							gutterBottom
							variant="body1"
							component="p"
							color="textSecondary"
						>
							{artist}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton size="small" color="primary">
							<PlayArrow/>
						</IconButton>
						<IconButton size="small" color="primary">
							<PlaylistAdd/>
						</IconButton>
					</CardActions>
				</div>
			</div>
		</Card>
	);
};

Song.propTypes = {
	artist: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

export default Song;
