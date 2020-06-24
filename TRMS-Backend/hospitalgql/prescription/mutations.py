from prescription.models import Prescription
from django.core.exceptions import ObjectDoesNotExist
from examination.models import Examination
from basictest.models import BasicTest
import graphene
from .types import PrescriptionGrapheneObjInput, PrescriptionGrapheneObj


class CreatePrescription(graphene.Mutation):
    class Arguments:
        prescription_info = PrescriptionGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    prescription = graphene.Field(lambda: PrescriptionGrapheneObj) 
    message = graphene.String()
    def mutate(self, info, prescription_info ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        prescription = Prescription.objects.create(**prescription_info)
        ok = True
        message = "Prescription creation test"
        return CreatePrescription(prescription=prescription, ok=ok, message = message)

class EditPrescription(graphene.Mutation):
    class Arguments:
        prescription_id = graphene.Int()
        prescription_info = PrescriptionGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    prescription = graphene.Field(lambda: PrescriptionGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, prescription_id, prescription_info ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        prescription = None
        try:
            prescription = Prescription.objects.get(pk=prescription_id)
            for attr, value in prescription_info.__dict__.items(): 
                if( not (value == None)): 
                    setattr(prescription, attr, value)
            prescription.save()
            ok = True
            message = "Prescription edition testing"
        except Exception:
            message = "Prescription you want to edit not exist"
            exam = ""
            try:
                if(not prescription_info.examination_id == None):
                    exam = Examination.objects.get(pk = prescription_info.examination_id)
            except ObjectDoesNotExist:
                message = "Examination you want change not exist"
                pass
            try:
                if(not prescription_info.basic_test_id == None):
                    exam = BasicTest.objects.get(pk = prescription_info.basic_test)
            except ObjectDoesNotExist:
                message = "Basic test you want change not exist"
                pass
            ok = False
        finally: 
            return EditPrescription(prescription = prescription, ok=ok, message = message)
        
class DeletePrescription(graphene.Mutation):
    class Arguments:
        prescription_id = graphene.Int()

    ok = graphene.Boolean()
    prescription = graphene.Field(lambda: PrescriptionGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, prescription_id ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        prescription = None
        try:
            prescription = Prescription.objects.get(pk=prescription_id)
            prescription.delete()
            message = "Prescription deletion testing "
        except Exception: 
            ok = False
            message = "Prescription you want to remove not exist"
        finally: 
            return DeletePrescription(prescription = prescription, ok=ok, message = message)

