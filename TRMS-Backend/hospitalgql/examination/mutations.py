from examination.models import Examination
from django.core.exceptions import ObjectDoesNotExist
from doctor.models import Doctor
from patient.models import Patient
from testcase.models import TestCase
from treatment.models import Treatment
from prescription.models import Prescription, PrescriptionUnit
from hospitalgql.patient.types import PatientType
from hospitalgql.testcase.types import TestCaseGrapheneObjInput
from hospitalgql.treatment.types import TreatmentGrapheneObjInput, TreatmentGrapheneObjInputForExamination
import graphene
from .types import ExaminationType


class ExaminationGrapheneObjInput(graphene.InputObjectType):
    record_id = graphene.Int()
    time = graphene.DateTime()
    status = graphene.String()


class ExaminationGrapheneEditObjectInput(graphene.InputObjectType):
    status = graphene.String()
    testcase = graphene.List(TestCaseGrapheneObjInput)
    pre_diagnosis = graphene.String()
    imp_diagnosis = graphene.String()
    treatment = graphene.Field(TreatmentGrapheneObjInputForExamination)


class ExaminationGrapheneObj(graphene.ObjectType):
    record_id = graphene.Int()
    time = graphene.DateTime()
    status = graphene.String()
    created_by_id = graphene.Int()


class CreateExamination(graphene.Mutation):
    class Arguments:
        examination_info = ExaminationGrapheneObjInput(required=True)

    ok = graphene.Boolean()
    examination = graphene.Field(lambda: ExaminationType)
    message = graphene.String()

    def mutate(self, info, examination_info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        examination = Examination.objects.create(
            **examination_info, created_by=user)
        newTM = Treatment.objects.create(examination=examination, created_by=user)
        newPS = Prescription.objects.create(treatment=newTM)
        print("examination is: ", examination)
        ok = True
        message = "Examination creation test"
        return CreateExamination(examination=examination, ok=ok, message=message)


class EditExamination(graphene.Mutation):
    class Arguments:
        examination_id = graphene.Int()
        segment_id = graphene.Int()
        examination_info = ExaminationGrapheneEditObjectInput(required=True)

    ok = graphene.Boolean()
    examination = graphene.Field(lambda: ExaminationType)
    message = graphene.String()

    def mutate(self, info, examination_id, segment_id, examination_info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        examination = None
        try:
            examination = Examination.objects.get(pk=examination_id)
            applyTC = []
            if(segment_id == 1):
                editing = examination_info.testcase
                origin = examination.testcase.all()
                for tc in editing:
                    needEditedTC = origin.filter(
                        basic_test_id=tc.basic_test_id).first()
                    if(needEditedTC != None):
                        needEditedTC.result = tc.result
                        needEditedTC.save()
                        applyTC.append(needEditedTC)
                    else:
                        newTC = TestCase.objects.create(
                            **tc, examination=examination, created_by=user)
                        applyTC.append(newTC)
                for tc in origin:
                    needEditedTC = len(
                        list(filter(lambda e: e.basic_test_id == tc.basic_test_id, editing)))
                    if(needEditedTC == 0):
                        tc.delete()
                examination.testcase.set(applyTC)
            elif(segment_id == 2):
                examination.pre_diagnosis = examination_info.pre_diagnosis
                examination.imp_diagnosis = examination_info.imp_diagnosis
                examination.save()
            else:
                editingTM = examination_info.treatment
                originTM = examination.treatment

                if(originTM == None):
                    newTM = Treatment.objects.create(
                        examination=examination, treatmentGuide=editingTM.treatmentGuide)
                else:
                    originTM.treatmentGuide = editingTM.treatmentGuide
                    originTM.save()
                    editingPS = examination_info.treatment.prescription
                    originPS = examination.treatment.prescription
                    if(originPS == None):
                        newPS = Prescription.objects.create(
                            treatment=examination.treatment)
                    else:
                        editingML = examination_info.treatment.prescription.medication_list
                        originML = examination.treatment.prescription.medication_list.all()
                        for tc in editingML:
                            needEditedTC = originML.filter(
                                medication_id=tc.medication_id).first()
                            if(needEditedTC != None):
                                needEditedTC.quantity = tc.quantity
                                needEditedTC.save()
                                applyTC.append(needEditedTC)
                            else:
                                newTC = PrescriptionUnit.objects.create(
                                    **tc, prescription=examination.treatment.prescription)
                                applyTC.append(newTC)
                        for tc in originML:
                            needEditedTC = len(
                                list(filter(lambda e: e.medication_id == tc.medication_id, editingML)))
                            if(needEditedTC == 0):
                                tc.delete()

            # for attr, value in examination_info.__dict__.items():
            #     if(not (value == None)):
            #         setattr(examination, attr, value)
            examination.save()
            ok = True
            message = "Examination edition testing"
        except Exception as err:
            message = "Error: {0}".format(err)
            ok = False
        finally:
            return EditExamination(examination=examination, ok=ok, message=message)


class DeleteExamination(graphene.Mutation):
    class Arguments:
        examination_id = graphene.Int()

    ok = graphene.Boolean()
    examination = graphene.Field(lambda: ExaminationType)
    message = graphene.String()

    def mutate(self, info, examination_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        examination = None
        try:
            examination = Examination.objects.get(pk=examination_id)
            examination.delete()
            message = "Examination deletion testing "
        except Exception:
            ok = False
            message = "Examination you want to remove not exist"
        finally:
            return DeleteExamination(examination=examination, ok=ok, message=message)
