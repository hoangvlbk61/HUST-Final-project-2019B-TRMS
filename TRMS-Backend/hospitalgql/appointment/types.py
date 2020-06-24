import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from appointment.models import Appointment

# Query 
class AppointmentType(DjangoObjectType):
    """DjangoObjectType to acces the Schoolclass model."""

    class Meta:
        model = Appointment

class AppointmentPaginatedType(ObjectType):
    """A paginated type generic object to provide pagination to the Teacher
    graph."""
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    objects = graphene.List(AppointmentType)

#Mutation
class AppointmentGrapheneObjInput(graphene.InputObjectType):
    doctor_id = graphene.Int()
    patient_id = graphene.Int() 
    time = graphene.DateTime()
    address = graphene.String()
    status = graphene.String()

class AppointmentGrapheneObj(graphene.ObjectType):
    doctor_id = graphene.Int()
    patient_id = graphene.Int() 
    time = graphene.DateTime()
    address = graphene.String()
    status = graphene.String()