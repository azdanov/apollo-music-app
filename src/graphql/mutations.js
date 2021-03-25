import {gql} from '@apollo/client';

export const ADD_SONG = gql`
	mutation addSong(
		$artist: String!
		$title: String!
		$thumbnail: String!
		$duration: Float!
		$url: String!
	) {
		insert_songs_one(
			object: {
				artist: $artist
				title: $title
				thumbnail: $thumbnail
				duration: $duration
				url: $url
			}
		) {
			id
		}
	}
`;

export const ADD_OR_REMOVE_FROM_PLAYLIST = gql`
	mutation addOrRemoveFromPlaylist($input: SongInput!) {
		addOrRemoveFromPlaylist(input: $input) @client
	}
`;
