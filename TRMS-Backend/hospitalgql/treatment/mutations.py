from treatment.models import Treatment
from django.core.exceptions import ObjectDoesNotExist
from examination.models import Examination
import graphene
from .types import TreatmentGrapheneObjInput, TreatmentGrapheneObj

class CreateTreatment(graphene.Mutation):
    class Arguments:
        treatment_info = TreatmentGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    treatment = graphene.Field(lambda: TreatmentGrapheneObj) 
    message = graphene.String()
    def mutate(self, info, treatment_info ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        treatment = Treatment.objects.create(**treatment_info, created_by = user)
        ok = True
        message = "Treatment creation test"
        return CreateTreatment(treatment=treatment, ok=ok, message = message)

class EditTreatment(graphene.Mutation):
    class Arguments:
        treatment_id = graphene.Int()
        treatment_info = TreatmentGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    treatment = graphene.Field(lambda: TreatmentGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, treatment_id, treatment_info ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        treatment = None
        try:
            treatment = Treatment.objects.get(pk=treatment_id)
            for attr, value in treatment_info.__dict__.items(): 
                if( not (value == None)): 
                    setattr(treatment, attr, value)
            treatment.save()
            ok = True
            message = "Treatment edition testing"
        except Exception:
            message = "Treatment you want to edit not exist"
            exam = ""
            try:
                if(not treatment_info.examination_id == None):
                    exam = Examination.objects.get(pk = treatment_info.examination_id)
            except ObjectDoesNotExist:
                message = "Examination you want change not exist"
                pass
            ok = False
        finally: 
            return EditTreatment(treatment = treatment, ok=ok, message = message)
        
class DeleteTreatment(graphene.Mutation):
    class Arguments:
        treatment_id = graphene.Int()

    ok = graphene.Boolean()
    treatment = graphene.Field(lambda: TreatmentGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, treatment_id ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        treatment = None
        try:
            treatment = Treatment.objects.get(pk=treatment_id)
            treatment.delete()
            message = "Treatment deletion testing "
        except Exception: 
            ok = False
            message = "Treatment you want to remove not exist"
        finally: 
            return DeleteTreatment(treatment = treatment, ok=ok, message = message)

