/** @format */

import gql from "graphql-tag";

export const FETCH_ALL = gql`
	query {
		patientList {
		  id
		  name
		  address
		  contact
		  ssid
		  gender
		  age
		  appointment {
			id
			time
			status
			address
		  }
		}
	  }
`;
