/** @format */

import gql from "graphql-tag";

// Query GQL
export const FETCH_PAGINATION = gql`
	query {
		patientPaginated(page: 4, pageSize: 10) {
			page
			pages
			hasNext
			hasPrev
			objects {
				id
				name
				quantity
				companyName
				description
				patientGuide
				patientType
				notion
				isFreeBuy
				isFinedPatient
			}
		}
	}
`;

export const FETCH_ALL = gql`
	{
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

// MUTATION
export const CREATE = gql`
	mutation createPatient($patientInfo: PatientGrapheneObjInput!) {
		createPatient(patientInfo: $patientInfo) {
			ok
			patient {
			  name
			  address
			  contact
			  ssid
			  gender
			  age
		  }
			message
		  }
	}
`;

export const UPDATE = gql`
	mutation editPatient(
		$patientId: Int!
		$patientInfo: PatientGrapheneObjInput!
	) {
		editPatient(
			patientId: $patientId
			patientInfo: $patientInfo
		) {
			ok
			patient {
				name
				address
				contact
				ssid
				gender
				age
			}
			message
		}
	}
`;

export const DELETE = gql`
	mutation deletePatient($patientId: Int!) {
		deletePatient(patientId: $patientId) {
			ok
			patient {
				name
				address
				contact
				ssid
				gender
				age
			}
			message
		}
	}
`;
