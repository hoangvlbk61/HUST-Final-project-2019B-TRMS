from prescription.models import Prescription, PrescriptionUnit

def resolve_prescription_detail(info, prescription_id):
    if prescription_id is None:
        raise Exception('Invalid Paramter')
    return Prescription.objects.get(pk=prescription_id)

def resolve_prescription_list(): 
    return Prescription.objects.all()

def resolve_prescription_unit_detail(info, prescription_unit_id):
    if prescription_unit_id is None:
        raise Exception('Invalid Paramter')
    return PrescriptionUnit.objects.get(pk=prescription_unit_id)

def resolve_prescription_unit_list(): 
    return PrescriptionUnit.objects.all()

def resolve_prescription_unit_list_as_prescription(info, prescription_id): 
    if prescription_id is None:
        raise Exception('Invalid Paramter')
    return Prescription.objects.get(pk=prescription_id).medication_list.all()

