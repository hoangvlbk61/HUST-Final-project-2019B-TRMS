""" Model for basic test class """
from django.db import models
from common.models import User
from examination.models import Examination
from medication.models import Medication
# Create your models here.

class Treatment(models.Model):
    """ Treatment class """
    examination = models.OneToOneField(
        Examination, related_name='treatment', on_delete=models.CASCADE)
    treatmentGuide = models.CharField(max_length = 2048, default="")

    created_on = models.DateTimeField(('created on'), auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name='treatment_author', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.examination) + " treatment"
