from django.db import models
from medication.models import Medication
from treatment.models import Treatment
from django.core.validators import MaxValueValidator, MinValueValidator


class Prescription(models.Model):
    treatment = models.OneToOneField(
        Treatment, related_name='prescription', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.treatment) + " prescription"


class PrescriptionUnit(models.Model):
    prescription = models.ForeignKey(
        Prescription, related_name='medication_list', on_delete=models.CASCADE)
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    quantity = models.IntegerField(
        default=0, validators=[MinValueValidator(1)])

    def __str__(self):
        return "Pres: " + str(self.prescription.id) + " unit"
