/** @format */

import gql from "graphql-tag";

// Query GQL

export const FETCH_AS_PATIENT = gql`
	query examinationListAllPatient($patientId: ID!) {
		examinationListAllPatient(patientId: $patientId) {
			id
			testcase {
				id
				basicTest {
					id
					testType
					testName
				}
				result
			}
			treatment {
				id
				prescription {
					medicationList {
						medication {
							id
							name
						}
						quantity
					}
				}
				treatmentGuide
			}
			time
			status
			preDiagnosis
			impDiagnosis
		}
	}
`;

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
	query {
		examinationList {
			id
			testcase {
				id
				basicTest {
					id
					testType
					testName
				}
				result
			}
			treatment {
				id
				prescription {
					medicationList {
						medication {
							id
							name
						}
						quantity
					}
				}
				treatmentGuide
			}
			time
			status
			preDiagnosis
			impDiagnosis
		}
	}
`;

// MUTATION
export const CREATE = gql`
	mutation createExamination($examinationInfo: ExaminationGrapheneObjInput!) {
		createExamination(examinationInfo: $examinationInfo) {
			ok
			message
			examination {
				id
				record {
					id
					name
				}
				preDiagnosis
				impDiagnosis
				time
				status
				testcase {
					basicTest {
						testName
						testType
					}
					result
				}
				treatment {
					id
					prescription {
						medicationList {
							medication {
								id
								name
							}
							quantity
						}
					}
				}
			}
		}
	}
`;

export const UPDATE = gql`
	mutation editExamination(
		$examinationId: Int!
		$segmentId: Int!
		$examinationInfo: ExaminationGrapheneEditObjectInput!
	) {
		editExamination(
			examinationId: $examinationId
			examinationInfo: $examinationInfo
			segmentId: $segmentId
		) {
			ok
			message
			examination {
				testcase {
					id
					basicTest {
						id
						testName
						testType
					}
					result
				}
				preDiagnosis
				impDiagnosis
				treatment {
					prescription {
						medicationList {
							medication {
								id
								name
							}
							quantity
						}
					}
				}
			}
		}
	}
`;

export const DELETE = gql`
	mutation deleteExamination($examinationId: Int!) {
		deleteExamination(examinationId: $examinationId) {
			ok
			message
			examination {
				time
				status
			}
		}
	}
`;
