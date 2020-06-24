""" Model for basic test class """
from django.db import models
from common.models import User
from examination.models import Examination
from basictest.models import BasicTest
# Create your models here.


class TestCase(models.Model):
    """ TestCase class """
    examination = models.ForeignKey(
        Examination, related_name='testcase', on_delete=models.CASCADE)
    basic_test = models.ForeignKey(BasicTest, related_name = 'basic_test', on_delete=models.CASCADE)
    result = models.CharField(max_length = 255, default="")
    created_on = models.DateTimeField(('created on'), auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name='test_case_author', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.basic_test) + ": " + str(self.result)
