import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import theme from './theme.js';
import {CssBaseline, MuiThemeProvider} from '@material-ui/core';

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<CssBaseline/>
			<App/>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.querySelector('#root')
);
