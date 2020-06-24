from doctor.models import Doctor


def resolve_doctor_detail(info, doctorid):
    if doctorid is None:
        raise Exception('Invalid Paramter')
    return Doctor.objects.get(pk=doctorid)

def resolve_doctor_list(): 
    return Doctor.objects.all()
