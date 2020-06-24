from testcase.models import TestCase

def resolve_testcase_detail(info, testcaseid):
    if testcaseid is None:
        raise Exception('Invalid Paramter')
    return TestCase.objects.get(pk=testcaseid)

def resolve_testcase_list(): 
    return TestCase.objects.all()
