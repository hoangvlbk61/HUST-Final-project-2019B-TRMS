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

export const FETCH_ALL_AS_DOCTOR = gql`
	query appointmentListAllDoctor($doctorId: Int!) {
		appointmentListAllDoctor(doctorId: $doctorId) {
			id
			doctor {
				id
				name
				position
				registered
			}
			patient {
				id
				name
				address
				ssid
				contact
				createdOn
			}
			time
			address
			status
		}
	}
`;

export const FETCH_ALL_AS_DOCTOR_BY_DAY = gql`
	query appointmentListAllDoctorByDay(
		$doctorId: Int!
		$fromDate: String!
		$toDate: String!
	) {
		appointmentListAllDoctorByDay(
			doctorId: $doctorId
			fromDate: $fromDate
			toDate: $toDate
		) {
			id
			doctor {
				id
				name
			}
			patient {
				name
				id
			}
			time
			address
			status
		}
	}
`;
// MUTATION
export const CREATE = gql`
	mutation createAppointment($appointmentInfo: AppointmentGrapheneObjInput!) {
		createAppointment(appointmentInfo: $appointmentInfo) {
			ok
			appointment {
				doctorId
				patientId
				time
				address
				status
			}
			message
		}
	}
`;

export const UPDATE = gql`
	mutation editAppointment(
		$appointmentId: Int!
		$appointmentInfo: AppointmentGrapheneObjInput!
	) {
		editAppointment(
			appointmentId: $appointmentId
			appointmentInfo: $appointmentInfo
		) {
			ok
			appointment {
				doctorId
				patientId
				time
				address
				status
			}
			message
		}
	}
`;

export const DELETE = gql`
	mutation deleteAppointment($appointmentId: Int!) {
		deleteAppointment(appointmentId: $appointmentId) {
			ok
			message
			appointment {
			  doctorId
			  patientId
			  time
			  address
			  status
			}
		  }
	}
`;
