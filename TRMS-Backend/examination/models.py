""" Model for basic test class """
from django.db import models
from common.models import User
from patient.models import Patient
from datetime import datetime
# Create your models here.


class Examination(models.Model):
    """ Examination class """
    record = models.ForeignKey(
        Patient, related_name='examinations', on_delete=models.CASCADE)
    pre_diagnosis = models.CharField(
        ('Chẩn đoán sơ bộ'), default='', max_length=512)
    imp_diagnosis = models.CharField(
        ('Chẩn đoán xác định'), default='', max_length=512)
    time = models.DateTimeField(
        ('Thời gian khám'), auto_now_add=False, default=datetime.today())
    status = models.CharField(
        "Trạng thái khám", default="Chưa khám", max_length=63)
    created_on = models.DateTimeField(('created on'), auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name='examination_author', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.record) + " khám vào " + str(self.time)
