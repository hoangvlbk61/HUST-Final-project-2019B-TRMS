from appointment.models import Appointment
from hospitalgql.helpers import paginate_data
from patient.models import Patient
from doctor.models import Doctor
from .types import AppointmentPaginatedType


def resolve_appointment_detail(appointmentid):
    if appointmentid is None:
        raise Exception('Invalid Paramter')
    return Appointment.objects.get(pk=appointmentid)


def resolve_appointment_list_all():
    return Appointment.objects.all()


def resolve_appointment_list_all_patient(patient_id):
    patientFilter = Patient.objects.filter(pk=patient_id)
    if patientFilter == 0:
        raise Exception('patient is not exist or has been removed !')
    patient = Patient.objects.get(pk=patient_id)
    return patient.appointment.all()


def resolve_appointment_list_all_doctor(doctor_id):
    doctorFilter = Doctor.objects.filter(pk=doctor_id)
    if doctorFilter == 0:
        raise Exception('doctor is not exist or has been removed !')
    doctor = Doctor.objects.get(pk=doctor_id)
    return doctor.appointment.all()


def resolve_appointment_list_all():
    return Appointment.objects.all()


def resolve_appointment_paginated_list(page, page_size):
    aptments = Appointment.objects.all()
    return paginate_data(aptments, page_size, page, AppointmentPaginatedType)


def resolve_appointment_paginated_patient(patient_id, page, page_size):
    patientFilter = Patient.objects.filter(pk=patient_id).count()
    if patientFilter == 0:
        raise Exception('patient is not exist or has been removed !')
    patient = Patient.objects.get(pk=patient_id)
    apt_as_patient = patient.appointment.all()
    return paginate_data(apt_as_patient, page_size, page, AppointmentPaginatedType)


def resolve_appointment_paginated_doctor(doctor_id, page, page_size):
    doctorFilter = Doctor.objects.filter(pk=doctor_id).count()
    if doctorFilter == 0:
        raise Exception('doctor is not exist or has been removed !')
    doctor = Doctor.objects.get(pk=doctor_id)
    apt_as_doctor = doctor.appointment.all()
    return paginate_data(apt_as_doctor, page_size, page, AppointmentPaginatedType)


def resolve_appointment_list_all_doctor_by_day(doctor_id, fromDate, toDate):
    return Appointment.objects.filter(doctor_id=doctor_id, time__range=[fromDate, toDate])
    
def resolve_appointment_list_all_patient_by_day(patient_id, fromDate, toDate):
    return Appointment.objects.filter(patient_id=patient_id, time__range=[fromDate, toDate])
