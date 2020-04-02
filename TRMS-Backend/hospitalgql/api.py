import graphene
import graphql_jwt
from hospitalgql.nurse.schema import NurseQuery

class Query(NurseQuery , graphene.ObjectType):
    pass
class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    pass

schema = graphene.Schema(query=Query, mutation = Mutation)