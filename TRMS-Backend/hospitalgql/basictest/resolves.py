from basictest.models import BasicTest

def resolve_basictest_detail(info, basictestid):
    if basictestid is None:
        raise Exception('Invalid Paramter')
    return BasicTest.objects.get(pk=basictestid)

def resolve_basictest_list(): 
    return BasicTest.objects.all()
