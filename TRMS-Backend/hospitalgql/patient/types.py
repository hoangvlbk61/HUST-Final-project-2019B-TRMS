""" Patient types
"""
import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from patient.models import Patient


class PatientType(DjangoObjectType):
    """DjangoObjectType to acces the Schoolclass model."""

    class Meta:
        model = Patient
