import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from examination.models import Examination


class ExaminationType(DjangoObjectType):
    """DjangoObjectType to acces the Schoolclass model."""

    class Meta:
        model = Examination

class ExaminationPaginatedType(ObjectType):
    """A paginated type generic object to provide pagination to the Teacher
    graph."""
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    objects = graphene.List(ExaminationType)
