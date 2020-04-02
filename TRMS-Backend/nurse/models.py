from django.db import models
from common.models import User
# Create your models here.

class Nurse(models.Model):
    user = models.ForeignKey(User, related_name='schools', on_delete = models.CASCADE)
    name = models.CharField("Họ tên", max_length = 255)
    position = models.CharField("Tên vị trí", max_length = 255)
    registered = models.BooleanField("Đã đăng ký")
    created_on = models.DateTimeField(('created on'), auto_now_add=True)
    created_by = models.ForeignKey(User, related_name='created_schools', on_delete = models.CASCADE)

    def __str__(self): 
        return self.name