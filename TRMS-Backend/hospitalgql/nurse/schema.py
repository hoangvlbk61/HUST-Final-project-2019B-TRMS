import graphene
from graphene_django.types import DjangoObjectType

from .types import NurseType
from .resolves import resolve_nurse_detail

class NurseQuery(graphene.ObjectType):
    
    """Abstract object to register in the root schema, allowing to query the

    model."""
    nurse_detail = graphene.Field(NurseType, id = graphene.ID())
    
    def resolve_nurse_detail(self, info, id, **kwargs):
        return resolve_nurse_detail(info, id)
