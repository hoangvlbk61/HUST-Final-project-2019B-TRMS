import graphene
from graphene_django.types import DjangoObjectType
from doctor.models import Doctor
from .types import DoctorType
from .resolves import resolve_doctor_detail, resolve_doctor_list
from .mutations import CreateDoctor, EditDoctor, DeleteDoctor
from datetime import datetime

class DoctorQuery(graphene.ObjectType):

    """Abstract object to register in the root schema, allowing to query the
    model."""
    doctor_detail = graphene.Field(DoctorType, id=graphene.ID())
    doctor_list = graphene.List(DoctorType)

    def resolve_doctor_detail(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_doctor_detail(info, id)

    def resolve_doctor_list(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_doctor_list()

class DoctorMutation(graphene.ObjectType):
    create_doctor = CreateDoctor.Field()
    edit_doctor = EditDoctor.Field()
    delete_doctor = DeleteDoctor.Field()
