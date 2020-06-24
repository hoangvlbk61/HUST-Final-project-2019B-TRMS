""" Model for doctor class """
from django.db import models
from common.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


class Patient(models.Model):
    """ Patient class """
    user = models.OneToOneField(
        User, related_name='patient', on_delete=models.CASCADE)
    gender = models.CharField("Giới tính", max_length=15, default="Nam")
    age = models.IntegerField("Tuổi", default=1, validators=[
                              MinValueValidator(1)])
    name = models.CharField("Họ tên", max_length=64)
    address = models.CharField("Địa chỉ", max_length=255)
    contact = models.CharField("Liên lạc", max_length=64)
    ssid = models.CharField("Mã an sinh xã hội", max_length=32)
    created_on = models.DateTimeField(('created on'), auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name='patient_author', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)
