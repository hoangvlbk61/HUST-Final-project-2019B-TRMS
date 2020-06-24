""" Model for medication class """
from django.db import models
from common.models import User
from django.core.validators import MaxValueValidator, MinValueValidator 
# Create your models here.


class Medication(models.Model):
    name = models.CharField("Tên thuốc", max_length=64)
    quantity = models.IntegerField("Số lượng", default = 0, validators=[MinValueValidator(0)])
    companyName = models.CharField("Công ty sản xuất", max_length = 256)
    description = models.CharField("Mô tả", max_length = 2048)
    medicationGuide = models.CharField("Hướng dẫn sử dụng", max_length = 256)
    medicationType = models.CharField("Loại thuốc", max_length = 256)
    notion = models.CharField("Lưu ý", max_length = 256 )
    isFreeBuy = models.BooleanField("Được mua tự do", default = True )
    isFinedMedication = models.BooleanField("Loại ổn định giá", default = False )

    created_on = models.DateTimeField(('created on'), auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name='created_by', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)