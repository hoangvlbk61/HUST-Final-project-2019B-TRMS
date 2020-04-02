from nurse.models import Nurse

def resolve_nurse_detail(info, nurseid):
    if nurseid is None:
        raise Exception('Invalid Paramter')
    return Nurse.objects.get(pk = nurseid)