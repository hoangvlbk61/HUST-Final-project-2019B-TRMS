from datetime import datetime
from .mutations import CreateExamination, EditExamination, DeleteExamination
import graphene
from graphene_django.types import DjangoObjectType
from .types import ExaminationType, ExaminationPaginatedType
from .resolves import (resolve_examination_detail, 
resolve_examination_list, 
resolve_examination_paginated_patient,
resolve_examination_list_all_patient,
resolve_examination_paginated_list)


class ExaminationQuery(graphene.ObjectType):

    """Abstract object to register in the root schema, allowing to query the
    model."""
    examination_detail = graphene.Field(ExaminationType, id=graphene.ID())
    examination_list = graphene.List(ExaminationType)
    examination_paginated_patient = graphene.Field(ExaminationPaginatedType, patient_id = graphene.ID(), page = graphene.Int(), page_size = graphene.Int())
    examination_list_all_patient = graphene.List(ExaminationType, patient_id = graphene.ID())
    examination_paginated_list = graphene.Field(ExaminationPaginatedType, page = graphene.Int(), page_size = graphene.Int())

    def resolve_examination_detail(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_examination_detail(info, id)

    def resolve_examination_list(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_examination_list()

    def resolve_examination_paginated_patient(self, info, patient_id, page, page_size): 
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_examination_paginated_patient(info, patient_id, page, page_size)

    def resolve_examination_list_all_patient(self, info, patient_id): 
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_examination_list_all_patient(info, patient_id)

    def resolve_examination_paginated_list(self, info, page, page_size):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_examination_paginated_list(info, page, page_size)

class ExaminationMutation(graphene.ObjectType):
    create_examination = CreateExamination.Field()
    edit_examination = EditExamination.Field()
    delete_examination = DeleteExamination.Field()
