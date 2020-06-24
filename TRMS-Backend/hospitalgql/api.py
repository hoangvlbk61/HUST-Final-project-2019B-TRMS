"""
Filename: api.py,
Purpose: Declares api for graphene,
"""
import graphene
import graphql_jwt
from hospitalgql.nurse.schema import NurseQuery
from hospitalgql.medication.schema import MedicationQuery
from hospitalgql.doctor.schema import DoctorQuery, DoctorMutation
from hospitalgql.patient.schema import PatientQuery, PatientMutation
from hospitalgql.medication.schema import MedicationQuery, MedicationMutation
from hospitalgql.appointment.schema import AppointmentQuery, AppointmentMutation
from hospitalgql.examination.schema import ExaminationQuery, ExaminationMutation
from hospitalgql.treatment.schema import TreatmentQuery, TreatmentMutation
from hospitalgql.testcase.schema import TestCaseQuery, TestCaseMutation
from hospitalgql.basictest.schema import BasicTestQuery, BasicTestMutation
from hospitalgql.prescription.schema import PrescriptionQuery, PrescriptionMutation 
from .authSchema import ObtainJSONWebToken

class Query(PrescriptionQuery ,NurseQuery, MedicationQuery, DoctorQuery, PatientQuery, AppointmentQuery, ExaminationQuery, TreatmentQuery, TestCaseQuery, BasicTestQuery, graphene.ObjectType):
    """ Query bypass
    """
    pass


class Mutation(PrescriptionMutation, DoctorMutation, PatientMutation, MedicationMutation, AppointmentMutation, ExaminationMutation, TreatmentMutation, TestCaseMutation, BasicTestMutation, graphene.ObjectType):
    """ Mutation for CD
    """
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()

    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
