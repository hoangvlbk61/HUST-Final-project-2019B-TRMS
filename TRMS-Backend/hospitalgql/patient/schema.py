import graphene
from graphene_django.types import DjangoObjectType
from patient.models import Patient
from .types import PatientType
from .resolves import resolve_patient_detail, resolve_patient_list
from .mutations import CreatePatient, EditPatient, DeletePatient
from datetime import datetime

class PatientQuery(graphene.ObjectType):

    """Abstract object to register in the root schema, allowing to query the
    model."""
    patient_detail = graphene.Field(PatientType, id=graphene.ID())
    patient_list = graphene.List(PatientType)

    def resolve_patient_detail(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_patient_detail(info, id)

    def resolve_patient_list(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_patient_list()

class PatientMutation(graphene.ObjectType):
    create_patient = CreatePatient.Field()
    edit_patient = EditPatient.Field()
    delete_patient = DeletePatient.Field()
