# Generated by Django 3.0.7 on 2020-06-21 04:29

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='age',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)], verbose_name='Tuổi'),
        ),
        migrations.AddField(
            model_name='patient',
            name='gender',
            field=models.CharField(default='Nam', max_length=15, verbose_name='Giới tính'),
        ),
    ]
