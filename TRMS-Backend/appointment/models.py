""" Model for basic test class """
from django.db import models
from common.models import User
from patient.models import Patient
from doctor.models import Doctor
# Create your models here.

class AppointmentStatus(models.TextChoices): 
    WAITING = "WAITING"
    HAPPENING = "HAPPENING"
    END = "END"

class Appointment(models.Model):
    """ Appointment class """
    doctor = models.ForeignKey(Doctor, related_name = 'appointment', on_delete = models.CASCADE)
    patient = models.ForeignKey(Patient, related_name = 'appointment', on_delete = models.CASCADE)
    time = models.DateTimeField(('Thời gian bắt đầu'), auto_now_add = False)
    address = models.CharField(max_length = 255, default= "")
    status = models.CharField(max_length = 10, choices = AppointmentStatus.choices, default = AppointmentStatus.WAITING)
    created_on = models.DateTimeField(('created on'), auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name='appointment_author', on_delete=models.CASCADE)

    class Meta:
        ordering = ("-time",)

    def __str__(self):
        return str(self.status) + " " + str(self.time) 
