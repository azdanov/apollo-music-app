import {AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core';
import {AudiotrackSharp} from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
	title: {
		marginLeft: theme.spacing(1)
	}
}));

const Header = () => {
	const classes = useStyles();

	return (
		<AppBar position="fixed">
			<Toolbar>
				<AudiotrackSharp/>
				<Typography className={classes.title} variant="h6" component="h1">
					Music App
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
