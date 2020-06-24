import graphene
from graphene_django.types import DjangoObjectType
from .types import BasicTestType
from .resolves import resolve_basictest_detail, resolve_basictest_list
from .mutations import CreateBasicTest, EditBasicTest, DeleteBasicTest
from datetime import datetime

class BasicTestQuery(graphene.ObjectType):

    """Abstract object to register in the root schema, allowing to query the
    model."""
    basictest_detail = graphene.Field(BasicTestType, id=graphene.ID())
    basictest_list = graphene.List(BasicTestType)

    def resolve_basictest_detail(self, info, id, **kwargs):
        user = info.context.user
        print("User is ", info.context)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_basictest_detail(info, id)

    def resolve_basictest_list(self, info, **kwargs):
        user = info.context.user
        print("User is ", info.context)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_basictest_list()

class BasicTestMutation(graphene.ObjectType):
    create_basictest = CreateBasicTest.Field()
    edit_basictest = EditBasicTest.Field()
    delete_basictest = DeleteBasicTest.Field()
