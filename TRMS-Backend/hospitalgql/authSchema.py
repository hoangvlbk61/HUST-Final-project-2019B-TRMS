import graphene
import graphql_jwt
from graphene_django.types import DjangoObjectType, ObjectType

from common.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)
