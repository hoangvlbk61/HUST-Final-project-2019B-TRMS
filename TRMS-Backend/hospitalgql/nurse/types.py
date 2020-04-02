from nurse.models import Nurse
import graphene  
from graphene_django.types import DjangoObjectType, ObjectType

class NurseType(DjangoObjectType):
    """DjangoObjectType to acces the Schoolclass model."""

    class Meta:
        model = Nurse

# class TeacherPaginatedType(ObjectType):
#     """A paginated type generic object to provide pagination to the Teacher
#     graph."""
#     page = graphene.Int()
#     pages = graphene.Int()
#     has_next = graphene.Boolean()
#     has_prev = graphene.Boolean()
#     objects = graphene.List(TeacherType)
    
# class TeacherInputType(graphene.InputObjectType):
#     """
#     Teacher Input type
#     """
#     id = graphene.ID()
#     firstName = graphene.String()
#     lastName = graphene.String()
#     skillid = graphene.ID()
#     address = graphene.String()
#     birthday = graphene.Date()
#     email = graphene.String()
#     phone = graphene.String()
#     note = graphene.String()
#     academicid = graphene.ID()
