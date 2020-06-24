import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from treatment.models import Treatment
from hospitalgql.prescription.types import PrescriptionGrapheneObjInputForExamination

class TreatmentType(DjangoObjectType):
    """DjangoObjectType to acces the Schoolclass model."""

    class Meta:
        model = Treatment

class TreatmentGrapheneObjInput(graphene.InputObjectType):
    examination_id = graphene.Int()
    treatmentGuide = graphene.String()

class TreatmentGrapheneObjInputForExamination(graphene.InputObjectType):
    treatmentGuide = graphene.String()
    prescription = graphene.Field(PrescriptionGrapheneObjInputForExamination)

class TreatmentGrapheneObj(graphene.ObjectType):
    examination_id = graphene.Int()
    treatmentGuide = graphene.String()
    created_by_id = graphene.Int()