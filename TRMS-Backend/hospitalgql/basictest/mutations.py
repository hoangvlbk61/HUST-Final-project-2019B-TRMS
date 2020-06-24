from basictest.models import BasicTest, ExamType
import graphene

class BasicTestGrapheneObjInput(graphene.InputObjectType):
    testName = graphene.String() 
    testType = graphene.String()

class BasicTestGrapheneObj(graphene.ObjectType):
    testName = graphene.String() 
    testType = graphene.String()

class CreateBasicTest(graphene.Mutation):
    class Arguments:
        basictest_info = BasicTestGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    basictest = graphene.Field(lambda: BasicTestGrapheneObj) 
    message = graphene.String()
    # def mutate(self, info, name, position, registered, user_id, created_by_id ):
    #     basictest = BasicTest.objects.create(name=name, position=position, registered=registered, user_id= user_id, created_by_id=created_by_id)
    def mutate(self, info, basictest_info ):
        user = info.context.user
        print("User is ", info.context)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        basictest = BasicTest.objects.create(**basictest_info, created_by = user)
        ok = True
        message = "BasicTest creation test"
        return CreateBasicTest(basictest=basictest, ok=ok, message = message)

class EditBasicTest(graphene.Mutation):
    class Arguments:
        basictest_id = graphene.Int()
        basictest_info = BasicTestGrapheneObjInput(required = True)

    ok = graphene.Boolean()
    basictest = graphene.Field(lambda: BasicTestGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, basictest_id, basictest_info ):
        user = info.context.user
        print("User is ", info.context)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        basictest = None
        try:
            basictest = BasicTest.objects.get(pk=basictest_id)
            for attr, value in basictest_info.__dict__.items(): 
                if( not (value == None)): 
                    setattr(basictest, attr, value)
            basictest.save()
            ok = True
            message = "BasicTest edition testing"
        except Exception: 
            ok = False
            message = "BasicTest you want to remove not exist"
        finally: 
            return EditBasicTest(basictest = basictest, ok=ok, message = message)
        
class DeleteBasicTest(graphene.Mutation):
    class Arguments:
        basictest_id = graphene.Int()

    ok = graphene.Boolean()
    basictest = graphene.Field(lambda: BasicTestGrapheneObj) 
    message = graphene.String()

    def mutate(self, info, basictest_id ):
        user = info.context.user
        print("User is ", info.context)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        message = ""
        ok = True
        basictest = None
        try:
            basictest = BasicTest.objects.get(pk=basictest_id)
            basictest.delete()
            message = "BasicTest deletion testing "
        except Exception: 
            ok = False
            message = "BasicTest you want to remove not exist"
        finally: 
            return DeleteBasicTest(basictest = basictest, ok=ok, message = message)

