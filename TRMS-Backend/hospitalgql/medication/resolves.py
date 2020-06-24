from medication.models import Medication
from hospitalgql.helpers import paginate_data
from .types import MedicationPaginatedType
def resolve_medication_detail(info, medicationid):
    if medicationid is None:
        raise Exception('Invalid Paramter')
    return Medication.objects.get(pk=medicationid)

def resolve_medication_list(): 
    return Medication.objects.all()

def resolve_medication_paginated(page, page_size): 
    meds = Medication.objects.all()
    return paginate_data(meds, page_size, page, MedicationPaginatedType)  