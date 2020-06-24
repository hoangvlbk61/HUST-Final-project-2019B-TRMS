""" Model for doctor class """
from django.db import models
from common.models import User
# Create your models here.


class Doctor(models.Model):
    """ Doctor class """
    user = models.OneToOneField(
        User, related_name='doctors', on_delete=models.CASCADE)
    name = models.CharField("Họ tên", max_length=255)
    position = models.CharField("Tên vị trí", max_length=255)
    registered = models.BooleanField("Đã đăng ký")
    created_on = models.DateTimeField(('created on'), auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name='created_doctor', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)