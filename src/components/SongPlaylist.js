import {Avatar, IconButton, makeStyles, Typography, useMediaQuery} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

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

const PlaylistItem = ({artist, title, thumbnail}) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Avatar src={thumbnail} alt="Song thumbnail" className={classes.avatar}/>
			<div className={classes.songInfoContainer}>
				<Typography variant="subtitle2" className={classes.text}>
					{title}
				</Typography>
				<Typography variant="body2" className={classes.text}>
					{artist}
				</Typography>
			</div>
			<IconButton>
				<Delete color="error"/>
			</IconButton>
		</div>
	);
};

PlaylistItem.propTypes = {
	artist: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

const SongPlaylist = () => {
	const mediumPlus = useMediaQuery(theme => theme.breakpoints.up('md'));

	if (!mediumPlus) {
		return null;
	}

	const song = {
		artist: 'The Midnight',
		title: '\'Ghost in Your Stereo\' (Official Lyric Video)',
		thumbnail:
			'https://i.ytimg.com/an_webp/xo3yRQgggwY/mqdefault_6s.webp?du=3000&sqp=CPi204IG&rs=AOn4CLDtY5G7IVvWCTkR23B0j3ps7UvXlg'
	};

	return (
		<div style={{margin: '10px 0'}}>
			<Typography color="textSecondary" variant="button">
				Queue (5)
			</Typography>
			{Array.from({length: 5}, () => song).map((song, index) => (
				<PlaylistItem key={index} {...song}/>
			))}
		</div>
	);
};

export default SongPlaylist;
