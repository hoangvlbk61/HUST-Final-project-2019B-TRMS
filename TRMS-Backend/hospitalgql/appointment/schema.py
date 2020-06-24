from datetime import datetime
from .mutations import CreateAppointment, EditAppointment, DeleteAppointment
import graphene
from graphene_django.types import DjangoObjectType
from .types import AppointmentType, AppointmentPaginatedType
from .resolves import (resolve_appointment_detail,
                       resolve_appointment_list_all,
                       resolve_appointment_paginated_list,
                       resolve_appointment_paginated_patient,
                       resolve_appointment_paginated_doctor,
                       resolve_appointment_list_all_patient,
                       resolve_appointment_list_all_doctor,
                       resolve_appointment_list_all_doctor_by_day,
                       resolve_appointment_list_all_patient_by_day)


class AppointmentQuery(graphene.ObjectType):

    """Abstract object to register in the root schema, allowing to query the
    model."""
    appointment_detail = graphene.Field(AppointmentType, id=graphene.ID())
    appointment_list = graphene.List(AppointmentType)
    appointment_paginated_patient = graphene.Field(
        AppointmentPaginatedType, patient_id=graphene.Int(), page=graphene.Int(), page_size=graphene.Int())
    appointment_paginated_doctor = graphene.Field(
        AppointmentPaginatedType, doctor_id=graphene.Int(), page=graphene.Int(), page_size=graphene.Int())
    appointment_paginated_list = graphene.Field(
        AppointmentPaginatedType, page=graphene.Int(), page_size=graphene.Int())
    appointment_list_all_patient = graphene.List(
        AppointmentType, patient_id=graphene.Int())
    appointment_list_all_doctor = graphene.List(
        AppointmentType, doctor_id=graphene.Int())
    appointment_list_all_doctor_by_day = graphene.List(AppointmentType, doctor_id=graphene.Int(
    ), from_date=graphene.String(), to_date=graphene.String())
    appointment_list_all_patient_by_day = graphene.List(AppointmentType, patient_id=graphene.Int(
    ), from_date=graphene.String(), to_date=graphene.String())

    def resolve_appointment_detail(self, info, id, **kwargs):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_appointment_detail(info, id)

    def resolve_appointment_list(self, info, **kwargs):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')

        return resolve_appointment_list_all()

    def resolve_appointment_list_all_patient(self, info, patient_id):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_appointment_list_all_patient(patient_id)

    def resolve_appointment_list_all_doctor(self, info, doctor_id):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_appointment_list_all_doctor(doctor_id)

    def resolve_appointment_paginated_list(self, info, page, page_size):
        user = info.context.user
        print("User is ", info.context)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_appointment_paginated_list(page, page_size)

    def resolve_appointment_paginated_patient(self, info, patient_id, page, page_size):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_appointment_paginated_patient(info, patient_id, page, page_size)

    def resolve_appointment_paginated_doctor(self, info, doctor_id, page, page_size):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_appointment_paginated_doctor(info, doctor_id, page, page_size)

    def resolve_appointment_list_all_doctor_by_day(self, info, doctor_id, from_date, to_date):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_appointment_list_all_doctor_by_day(doctor_id, from_date, to_date)

    def resolve_appointment_list_all_patient_by_day(self, info, patient_id, from_date, to_date):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return resolve_appointment_list_all_patient_by_day(patient_id, from_date, to_date)


class AppointmentMutation(graphene.ObjectType):
    create_appointment = CreateAppointment.Field()
    edit_appointment = EditAppointment.Field()
    delete_appointment = DeleteAppointment.Field()
