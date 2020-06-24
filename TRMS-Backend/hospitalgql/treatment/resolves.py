from treatment.models import Treatment

def resolve_treatment_detail(info, treatmentid):
    if treatmentid is None:
        raise Exception('Invalid Paramter')
    return Treatment.objects.get(pk=treatmentid)

def resolve_treatment_list(): 
    return Treatment.objects.all()
