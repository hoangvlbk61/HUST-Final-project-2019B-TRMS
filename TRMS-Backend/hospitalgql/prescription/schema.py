import graphene
from graphene_django.types import DjangoObjectType
from .types import PrescriptionType
from .resolves import resolve_prescription_detail, resolve_prescription_list
from .mutations import CreatePrescription, EditPrescription, DeletePrescription
from datetime import datetime

class PrescriptionQuery(graphene.ObjectType):

    """Abstract object to register in the root schema, allowing to query the
    model."""
    prescription_detail = graphene.Field(PrescriptionType, id=graphene.ID())
    prescription_list = graphene.List(PrescriptionType)

    def resolve_prescription_detail(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_prescription_detail(info, id)

    def resolve_prescription_list(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_prescription_list()

class PrescriptionMutation(graphene.ObjectType):
    create_prescription = CreatePrescription.Field()
    edit_prescription = EditPrescription.Field()
    delete_prescription = DeletePrescription.Field()
