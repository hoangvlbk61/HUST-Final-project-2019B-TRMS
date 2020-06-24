from appointment.models import Appointment
from django.core.exceptions import ObjectDoesNotExist
from doctor.models import Doctor
from patient.models import Patient
import graphene
from .types import AppointmentGrapheneObjInput, AppointmentGrapheneObj

class CreateAppointment(graphene.Mutation):
    class Arguments:
        appointment_info = AppointmentGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    appointment = graphene.Field(lambda: AppointmentGrapheneObj) 
    message = graphene.String()
    def mutate(self, info, appointment_info ):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        appointment = Appointment.objects.create(**appointment_info, created_by = user)
        ok = True
        message = "Appointment creation test"
        return CreateAppointment(appointment=appointment, ok=ok, message = message)

class EditAppointment(graphene.Mutation):
    class Arguments:
        appointment_id = graphene.Int()
        appointment_info = AppointmentGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    appointment = graphene.Field(lambda: AppointmentGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, appointment_id, appointment_info ):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        appointment = None
        try:
            appointment = Appointment.objects.get(pk=appointment_id)
            for attr, value in appointment_info.__dict__.items(): 
                if( not (value == None)): 
                    setattr(appointment, attr, value)
            appointment.save()
            ok = True
            message = "Appointment edition testing"
        except Exception:
            message = "Appointment you want to edit not exist"
            ptn = ""
            doc = ""
            try:
                if(not appointment_info.doctor_id == None):
                    doc = Doctor.objects.get(pk = appointment_info.doctor_id)
            except ObjectDoesNotExist:
                message = "Doctor you want change not exist"
                pass
            try:
                if(not appointment_info.patient_id == None):
                    ptn = Patient.objects.get(pk = appointment_info.patient_id)
            except ObjectDoesNotExist:
                message = "Patient you want change not exist"
                pass
            ok = False
        finally: 
            return EditAppointment(appointment = appointment, ok=ok, message = message)
        
class DeleteAppointment(graphene.Mutation):
    class Arguments:
        appointment_id = graphene.Int()

    ok = graphene.Boolean()
    appointment = graphene.Field(lambda: AppointmentGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, appointment_id ):
        user = info.context.user
        print("User is ", user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        appointment = None
        try:
            appointment = Appointment.objects.get(pk=appointment_id)
            appointment.delete()
            message = "Appointment deletion testing "
        except Exception: 
            ok = False
            message = "Appointment you want to remove not exist"
        finally: 
            return DeleteAppointment(appointment = appointment, ok=ok, message = message)

