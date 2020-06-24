import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from prescription.models import PrescriptionUnit, Prescription


class PrescriptionType(DjangoObjectType):
    """DjangoObjectType to access the Prescription model."""

    class Meta:
        model = Prescription

class PrescriptionUnitType(DjangoObjectType):
    """DjangoObjectType to access the Prescription model."""

    class Meta:
        model = PrescriptionUnit

class PrescriptionUnitTypeInput(graphene.InputObjectType):
    medication_id = graphene.Int()
    quantity = graphene.Int()

class PrescriptionGrapheneObjInputForExamination(graphene.InputObjectType):
    medication_list = graphene.List(PrescriptionUnitTypeInput)
    
class PrescriptionGrapheneObjInput(graphene.InputObjectType):
    treatment_id = graphene.Int()

class PrescriptionGrapheneObj(graphene.ObjectType):
    treatment_id = graphene.Int()
    medication_list = graphene.List(PrescriptionUnitType)