import {ApolloProvider} from '@apollo/client';
import {CssBaseline, MuiThemeProvider} from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import client from './graphql/client.js';
import theme from './theme.js';

ReactDOM.render(
	<ApolloProvider client={client}>
		<MuiThemeProvider theme={theme}>
			<CssBaseline/>
			<App/>
		</MuiThemeProvider>
	</ApolloProvider>,
	document.querySelector('#root')
);
