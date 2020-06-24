import graphene
from graphene_django.types import DjangoObjectType
from .types import TestCaseType
from .resolves import resolve_testcase_detail, resolve_testcase_list
from .mutations import CreateTestCase, EditTestCase, DeleteTestCase
from datetime import datetime

class TestCaseQuery(graphene.ObjectType):

    """Abstract object to register in the root schema, allowing to query the
    model."""
    testcase_detail = graphene.Field(TestCaseType, id=graphene.ID())
    testcase_list = graphene.List(TestCaseType)

    def resolve_testcase_detail(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_testcase_detail(info, id)

    def resolve_testcase_list(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_testcase_list()

class TestCaseMutation(graphene.ObjectType):
    create_testcase = CreateTestCase.Field()
    edit_testcase = EditTestCase.Field()
    delete_testcase = DeleteTestCase.Field()
