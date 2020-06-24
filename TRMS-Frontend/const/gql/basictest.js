/** @format */

import gql from "graphql-tag";

// Query GQL
export const FETCH_PAGINATION = gql`
	query medicationPaginated($page: Int!, $pageSize: Int!) {
		medicationPaginated(page: 4, pageSize: 10) {
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
				medicationGuide
				medicationType
				notion
				isFreeBuy
				isFinedMedication
			}
		}
	}
`;

export const FETCH_ALL = gql`
	{
		basictestList {
			id
			testName
			testType
		}
	}
`;

// MUTATION
export const CREATE = gql`
	mutation createMedication($medicationInfo: MedicationGrapheneObjInput!) {
		createMedication(medicationInfo: $medicationInfo) {
			ok
			medication {
				name
				quantity
				description
				companyName
				medicationGuide
				medicationType
				createdBy
				isFreeBuy
				isFinedMedication
			}
			message
		}
	}
`;

export const UPDATE = gql`
	mutation editMedication(
		$medicationId: Int!
		$medicationInfo: MedicationGrapheneObjInput!
	) {
		editMedication(
			medicationId: $medicationId
			medicationInfo: $medicationInfo
		) {
			ok
			medication {
				name
				quantity
				description
				companyName
				medicationGuide
				medicationType
				createdBy
				isFreeBuy
				isFinedMedication
			}
			message
		}
	}
`;

export const DELETE = gql`
	mutation deleteMedication($medicationId: Int!) {
		deleteMedication(medicationId: $medicationId) {
			ok
			medication {
				name
				quantity
				description
				companyName
				medicationGuide
				medicationType
				createdBy
				isFreeBuy
				isFinedMedication
			}
			message
		}
	}
`;
