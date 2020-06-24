from patient.models import Patient


def resolve_patient_detail(info, patientid):
    if patientid is None:
        raise Exception('Invalid Paramter')
    return Patient.objects.get(pk=patientid)

def resolve_patient_list(): 
    return Patient.objects.all()
