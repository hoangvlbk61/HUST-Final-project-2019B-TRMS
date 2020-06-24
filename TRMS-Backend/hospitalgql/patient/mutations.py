from patient.models import Patient
from common.models import User
import graphene
affix_mail = "@trms.com.vn"


class PatientGrapheneObjInput(graphene.InputObjectType):
    name = graphene.String()
    address = graphene.String()
    contact = graphene.String()
    ssid = graphene.String()
    gender = graphene.String()
    age = graphene.Int()


class PatientGrapheneObj(graphene.ObjectType):
    name = graphene.String()
    address = graphene.String()
    contact = graphene.String()
    ssid = graphene.String()
    created_by_id = graphene.Int()
    gender = graphene.String()
    age = graphene.Int()
    user_id = graphene.Int()


class CreatePatient(graphene.Mutation):
    class Arguments:
        patient_info = PatientGrapheneObjInput(required=True)

    ok = graphene.Boolean()
    patient = graphene.Field(lambda: PatientGrapheneObj)
    message = graphene.String()

    def mutate(self, info, patient_info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        new_user_patient = User.objects.create(
            email=str(patient_info.ssid) + affix_mail, username=patient_info.ssid)
        new_user_patient.set_password(patient_info.ssid)
        patient = Patient.objects.create(
            **patient_info, created_by=user, user=new_user_patient)
        ok = True
        message = "Patient creation test"
        return CreatePatient(patient=patient, ok=ok, message=message)


class EditPatient(graphene.Mutation):
    class Arguments:
        patient_id = graphene.Int()
        patient_info = PatientGrapheneObjInput(required=True)

    ok = graphene.Boolean()
    patient = graphene.Field(lambda: PatientGrapheneObj)
    message = graphene.String()

    def mutate(self, info, patient_id, patient_info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        patient = None
        try:
            patient = Patient.objects.get(pk=patient_id)
            for attr, value in patient_info.__dict__.items():
                if(not (value == None)):
                    setattr(patient, attr, value)
            patient.save()
            ok = True
            message = "Patient edition testing"
        except Exception:
            ok = False
            message = "Patient you want to edit not exist"
        finally:
            return EditPatient(patient=patient, ok=ok, message=message)


class DeletePatient(graphene.Mutation):
    class Arguments:
        patient_id = graphene.Int()

    ok = graphene.Boolean()
    patient = graphene.Field(lambda: PatientGrapheneObj)
    message = graphene.String()

    def mutate(self, info, patient_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        patient = None
        try:
            patient = Patient.objects.get(pk=patient_id)
            patient.delete()
            message = "Patient deletion testing "
        except Exception:
            ok = False
            message = "Patient you want to remove not exist"
        finally:
            return DeletePatient(patient=patient, ok=ok, message=message)
