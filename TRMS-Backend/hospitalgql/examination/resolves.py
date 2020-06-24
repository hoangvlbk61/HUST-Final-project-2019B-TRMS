from examination.models import Examination
from hospitalgql.helpers import paginate_data
from .types import ExaminationPaginatedType
from patient.models import Patient

def resolve_examination_detail(info, examinationid):
    if examinationid is None:
        raise Exception('Invalid Paramter')
    return Examination.objects.get(pk=examinationid)

def resolve_examination_list(): 
    return Examination.objects.all()

def resolve_examination_paginated_patient(info, patient_id, page, page_size):
    patientFilter = Patient.objects.filter(pk=patient_id).count()
    if patientFilter == 0:
        raise Exception('patient is not exist or has been removed !')
    patient = Patient.objects.get(pk=patient_id)
    apt_as_patient = patient.examinations.all()
    return paginate_data(apt_as_patient, page_size, page, ExaminationPaginatedType) 

def resolve_examination_list_all_patient(info, patient_id):
    patientFilter = Patient.objects.filter(pk = patient_id)
    if patientFilter == 0:
        raise Exception('patient is not exist or has been removed !')
    patient = Patient.objects.get(pk = patient_id)
    return patient.examinations.all()

def resolve_examination_paginated_list(info, page, page_size):
    exms = Examination.objects.all()
    return paginate_data(exms, page_size, page, ExaminationPaginatedType)  