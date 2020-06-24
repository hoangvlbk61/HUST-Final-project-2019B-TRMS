from django.db import models
from medication.models import Medication
from django.core.validators import MaxValueValidator, MinValueValidator 

class Prescription(models.Model): 
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    quantity = models.IntegerField(default = 0, validators=[MinValueValidator(1)])