from doctor.models import Doctor
import graphene

class DoctorGrapheneObjInput(graphene.InputObjectType):
    name = graphene.String()
    position = graphene.String()
    registered = graphene.Boolean()
    user_id = graphene.Int()
    created_by_id = graphene.Int()

class DoctorGrapheneObj(graphene.ObjectType):
    name = graphene.String()
    position = graphene.String()
    registered = graphene.Boolean()
    user_id = graphene.Int()
    created_by_id = graphene.Int()

class CreateDoctor(graphene.Mutation):
    class Arguments:
        doctor_info = DoctorGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    doctor = graphene.Field(lambda: DoctorGrapheneObj) 
    message = graphene.String()
    # def mutate(self, info, name, position, registered, user_id, created_by_id ):
    #     doctor = Doctor.objects.create(name=name, position=position, registered=registered, user_id= user_id, created_by_id=created_by_id)
    def mutate(self, info, doctor_info ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        doctor = Doctor(**doctor_info)
        print("doctor_infodoctor_info: =====", doctor_info)
        print("result is : " + str(doctor))
        ok = True
        message = "Doctor creation test"
        return CreateDoctor(doctor=doctor, ok=ok, message = message)

class EditDoctor(graphene.Mutation):
    class Arguments:
        doctor_id = graphene.Int()
        doctor_info = DoctorGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    doctor = graphene.Field(lambda: DoctorGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, doctor_id, doctor_info ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        doctor = None
        try:
            doctor = Doctor.objects.get(pk=doctor_id)
            for attr, value in doctor_info.__dict__.items(): 
                if( not (value == None)): 
                    setattr(doctor, attr, value)
            doctor.save()
            ok = True
            message = "Doctor edition testing"
        except Exception: 
            ok = False
            message = "Doctor you want to remove not exist"
        finally: 
            return EditDoctor(doctor = doctor, ok=ok, message = message)
        
class DeleteDoctor(graphene.Mutation):
    class Arguments:
        doctor_id = graphene.Int()

    ok = graphene.Boolean()
    doctor = graphene.Field(lambda: DoctorGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, doctor_id ):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        doctor = None
        try:
            doctor = Doctor.objects.get(pk=doctor_id)
            doctor.delete()
            message = "Doctor deletion testing "
        except Exception: 
            ok = False
            message = "Doctor you want to remove not exist"
        finally: 
            return DeleteDoctor(doctor = doctor, ok=ok, message = message)

