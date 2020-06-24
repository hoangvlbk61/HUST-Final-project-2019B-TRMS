import graphene
from graphene_django.types import DjangoObjectType
from .types import MedicationType, MedicationPaginatedType
from .resolves import resolve_medication_detail, resolve_medication_list, resolve_medication_paginated
from .mutations import CreateMedication, EditMedication, DeleteMedication
from datetime import datetime

class MedicationQuery(graphene.ObjectType):

    """Abstract object to register in the root schema, allowing to query the
    model."""
    medication_detail = graphene.Field(MedicationType, id=graphene.ID())
    medication_list = graphene.List(MedicationType)
    medication_paginated = graphene.Field(MedicationPaginatedType, page = graphene.Int(), page_size = graphene.Int())
    def resolve_medication_detail(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_medication_detail(info, id)

    def resolve_medication_list(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_medication_list()

    def resolve_medication_paginated(self, info, page, page_size, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_medication_paginated(page, page_size)

class MedicationMutation(graphene.ObjectType):
    create_medication = CreateMedication.Field()
    edit_medication = EditMedication.Field()
    delete_medication = DeleteMedication.Field()
