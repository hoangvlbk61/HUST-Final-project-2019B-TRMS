""" Doctor types
"""
import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from doctor.models import Doctor


class DoctorType(DjangoObjectType):
    """DjangoObjectType to acces the Schoolclass model."""

    class Meta:
        model = Doctor
