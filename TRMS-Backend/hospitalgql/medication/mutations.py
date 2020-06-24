from medication.models import Medication
import graphene

class MedicationGrapheneObjInput(graphene.InputObjectType):
    name = graphene.String()
    quantity = graphene.Int()
    companyName = graphene.String()
    description = graphene.String()
    medicationGuide = graphene.String()
    medicationType = graphene.String()
    notion = graphene.String()
    isFreeBuy = graphene.Boolean()
    isFinedMedication = graphene.Boolean()

class MedicationGrapheneObj(graphene.ObjectType):
    name = graphene.String()
    quantity = graphene.Int()
    companyName = graphene.String()
    description = graphene.String()
    medicationGuide = graphene.String()
    medicationType = graphene.String()
    notion = graphene.String()
    isFreeBuy = graphene.Boolean()
    isFinedMedication = graphene.Boolean()
    created_by = graphene.String()

class CreateMedication(graphene.Mutation):
    class Arguments:
        medication_info = MedicationGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    medication = graphene.Field(lambda: MedicationGrapheneObj) 
    message = graphene.String()
    # def mutate(self, info, name, position, registered, user_id, created_by_id ):
    #     medication = Medication.objects.create(name=name, position=position, registered=registered, user_id= user_id, created_by_id=created_by_id)
    def mutate(self, info, medication_info ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        medication = Medication.objects.create(**medication_info, created_by = user)
        ok = True
        message = "Medication creation test"
        return CreateMedication(medication=medication, ok=ok, message = message)

class EditMedication(graphene.Mutation):
    class Arguments:
        medication_id = graphene.Int()
        medication_info = MedicationGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    medication = graphene.Field(lambda: MedicationGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, medication_id, medication_info ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        medication = None
        try:
            medication = Medication.objects.get(pk=medication_id)
            for attr, value in medication_info.__dict__.items(): 
                if( not (value == None)): 
                    setattr(medication, attr, value)
            medication.save()
            ok = True
            message = "Medication edition testing"
        except Exception: 
            ok = False
            message = "Medication you want to remove not exist"
        finally: 
            return EditMedication(medication = medication, ok=ok, message = message)
        
class DeleteMedication(graphene.Mutation):
    class Arguments:
        medication_id = graphene.Int()

    ok = graphene.Boolean()
    medication = graphene.Field(lambda: MedicationGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, medication_id ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        medication = None
        try:
            medication = Medication.objects.get(pk=medication_id)
            medication.delete()
            message = "Medication deletion testing "
        except Exception: 
            ok = False
            message = "Medication you want to remove not exist"
        finally: 
            return DeleteMedication(medication = medication, ok=ok, message = message)

