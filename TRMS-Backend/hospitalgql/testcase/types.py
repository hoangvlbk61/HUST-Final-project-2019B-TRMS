import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from testcase.models import TestCase


class TestCaseType(DjangoObjectType):
    """DjangoObjectType to acces the Schoolclass model."""

    class Meta:
        model = TestCase

class TestCaseGrapheneObjInput(graphene.InputObjectType):
    examination_id = graphene.Int()
    basic_test_id = graphene.Int()
    result = graphene.String()

class TestCaseGrapheneObj(graphene.ObjectType):
    examination_id = graphene.Int()
    basic_test_id = graphene.Int()
    result = graphene.String()
    created_by_id = graphene.Int()
