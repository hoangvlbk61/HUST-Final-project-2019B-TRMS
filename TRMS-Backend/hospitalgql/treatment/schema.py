import graphene
from graphene_django.types import DjangoObjectType
from .types import TreatmentType
from .resolves import resolve_treatment_detail, resolve_treatment_list
from .mutations import CreateTreatment, EditTreatment, DeleteTreatment
from datetime import datetime

class TreatmentQuery(graphene.ObjectType):

    """Abstract object to register in the root schema, allowing to query the
    model."""
    treatment_detail = graphene.Field(TreatmentType, id=graphene.ID())
    treatment_list = graphene.List(TreatmentType)

    def resolve_treatment_detail(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_treatment_detail(info, id)

    def resolve_treatment_list(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_treatment_list()

class TreatmentMutation(graphene.ObjectType):
    create_treatment = CreateTreatment.Field()
    edit_treatment = EditTreatment.Field()
    delete_treatment = DeleteTreatment.Field()
