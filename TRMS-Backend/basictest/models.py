""" Model for basic test class """
from django.db import models
from common.models import User
# Create your models here.

class ExamType(models.TextChoices): 
    BLOOD_TEST = "Blood test"
    OTHER_TEST = "Other test"

class BasicTest(models.Model):
    """ Basic test class """
    testName = models.CharField("Tên xét nghiệm", max_length=64)
    testType = models.CharField("Loại xét nghiệm", choices=ExamType.choices, default=ExamType.BLOOD_TEST ,max_length=64)

    created_on = models.DateTimeField(('created on'), auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name='basic_test_author', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.testName)
