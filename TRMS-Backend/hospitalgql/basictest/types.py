import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from basictest.models import BasicTest


class BasicTestType(DjangoObjectType):
    """DjangoObjectType to acces the Schoolclass model."""

    class Meta:
        model = BasicTest
