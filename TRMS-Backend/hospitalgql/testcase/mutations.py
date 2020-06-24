from testcase.models import TestCase
from django.core.exceptions import ObjectDoesNotExist
from examination.models import Examination
from basictest.models import BasicTest
import graphene
from .types import TestCaseGrapheneObjInput, TestCaseGrapheneObj

class CreateTestCase(graphene.Mutation):
    class Arguments:
        testcase_info = TestCaseGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    testcase = graphene.Field(lambda: TestCaseGrapheneObj) 
    message = graphene.String()
    def mutate(self, info, testcase_info ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        testcase = TestCase.objects.create(**testcase_info, created_by = user)
        ok = True
        message = "TestCase creation test"
        return CreateTestCase(testcase=testcase, ok=ok, message = message)

class EditTestCase(graphene.Mutation):
    class Arguments:
        testcase_id = graphene.Int()
        testcase_info = TestCaseGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    testcase = graphene.Field(lambda: TestCaseGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, testcase_id, testcase_info ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        testcase = None
        try:
            testcase = TestCase.objects.get(pk=testcase_id)
            for attr, value in testcase_info.__dict__.items(): 
                if( not (value == None)): 
                    setattr(testcase, attr, value)
            testcase.save()
            ok = True
            message = "TestCase edition testing"
        except Exception:
            message = "TestCase you want to edit not exist"
            exam = ""
            try:
                if(not testcase_info.examination_id == None):
                    exam = Examination.objects.get(pk = testcase_info.examination_id)
            except ObjectDoesNotExist:
                message = "Examination you want change not exist"
                pass
            try:
                if(not testcase_info.basic_test_id == None):
                    exam = BasicTest.objects.get(pk = testcase_info.basic_test)
            except ObjectDoesNotExist:
                message = "Basic test you want change not exist"
                pass
            ok = False
        finally: 
            return EditTestCase(testcase = testcase, ok=ok, message = message)
        
class DeleteTestCase(graphene.Mutation):
    class Arguments:
        testcase_id = graphene.Int()

    ok = graphene.Boolean()
    testcase = graphene.Field(lambda: TestCaseGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, testcase_id ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        testcase = None
        try:
            testcase = TestCase.objects.get(pk=testcase_id)
            testcase.delete()
            message = "TestCase deletion testing "
        except Exception: 
            ok = False
            message = "TestCase you want to remove not exist"
        finally: 
            return DeleteTestCase(testcase = testcase, ok=ok, message = message)

