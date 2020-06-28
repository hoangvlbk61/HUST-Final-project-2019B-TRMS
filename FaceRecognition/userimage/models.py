from django.db import models
from django.contrib.auth.models import User

def user_directory_path(instance, filename):
    return '{0}/{1}'.format(instance.user.id, filename)

class UserImage(models.Model):
    user = models.ForeignKey(User, related_name="images", default=None, on_delete=models.CASCADE)
    images = models.FileField(upload_to = user_directory_path )
   
    def __str__(self):
        return str(self.user.id) + "_" + str(self.id)