from django.contrib import admin

from .models import Prescription, PrescriptionUnit

admin.site.register(Prescription)
admin.site.register(PrescriptionUnit)