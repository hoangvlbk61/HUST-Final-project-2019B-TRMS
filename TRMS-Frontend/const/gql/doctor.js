/** @format */

import gql from "graphql-tag";

export const FETCH_ALL = gql`
	query {
		doctorList {
			id
			name
			position
		}
	}
`;
