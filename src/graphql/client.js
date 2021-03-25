import {ApolloClient, gql, HttpLink, InMemoryCache, split} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {GET_PLAYLIST} from './queries.js';

const httpLink = new HttpLink({
	uri: 'https://graphql-music-app.herokuapp.com/v1/graphql'
});

const wsLink = new WebSocketLink({
	uri: 'wss://graphql-music-app.herokuapp.com/v1/graphql',
	options: {
		reconnect: true
	}
});

const splitLink = split(
	({query}) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					playlist: {
						merge: false
					}
				}
			}
		}
	}),
	typeDefs: gql`
		type Song {
			id: uuid!
			title: String!
			artist: String!
			thumbnail: String!
			durations: Float!
			url: String!
		}

		input SongInput {
			id: uuid!
			title: String!
			artist: String!
			thumbnail: String!
			durations: Float!
			url: String!
		}

		type Query {
			playlist: [Song]!
		}

		type Mutation {
			addOrRemoveFromPlaylist(input: SongInput!): [Song]!
		}
	`,
	resolvers: {
		Mutation: {
			addOrRemoveFromPlaylist: (_, {input}, {cache}) => {
				const queryResult = cache.readQuery({query: GET_PLAYLIST});

				if (!queryResult) {
					return [];
				}

				const {playlist} = queryResult;
				const isInPlaylist = playlist.some(song => song.id === input.id);
				const newPlaylist = isInPlaylist ?
					playlist.filter(song => song.id !== input.id) :
					[...playlist, input];

				cache.writeQuery({
					query: GET_PLAYLIST,
					data: {playlist: newPlaylist}
				});

				return newPlaylist;
			}
		}
	}
});

const hasPlaylist = Boolean(localStorage.getItem('playlist'));

client.writeQuery({
	query: GET_PLAYLIST,
	data: {playlist: hasPlaylist ? JSON.parse(localStorage.getItem('playlist')) : []}
});

export default client;
