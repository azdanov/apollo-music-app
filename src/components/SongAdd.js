import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputAdornment,
	makeStyles,
	TextField
} from '@material-ui/core';
import {Link} from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center'
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

const SongAdd = () => {
	const classes = useStyles();
	const [dialog, setDialog] = React.useState(false);

	function handleCloseDialog() {
		setDialog(false);
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
						src="https://dummyimage.com/600x400/000/fff"
						alt="Song thumbnail"
						className={classes.thumbnail}
					/>
					<TextField fullWidth margin="dense" name="title" label="Title"/>
					<TextField fullWidth margin="dense" name="artist" label="Artist"/>
					<TextField
						fullWidth
						margin="dense"
						name="thumbnail"
						label="Thumbnail"
					/>
				</DialogContent>
				<DialogActions>
					<Button color="" onClick={handleCloseDialog}>
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
				placeholder="Paste Youtube/Soundcloud music link"
				margin="normal"
				type="url"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Link/>
						</InputAdornment>
					)
				}}
			/>
			<Button
				className={classes.songAddButton}
				variant="outlined"
				color="primary"
				onClick={() => setDialog(true)}
			>
				Add
			</Button>
		</div>
	);
};

export default SongAdd;
