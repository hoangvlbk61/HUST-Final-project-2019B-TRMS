from django.contrib import admin

from .models import UserImage

class UserImageAdmin(admin.ModelAdmin):
    pass

admin.site.register(UserImage, UserImageAdmin)