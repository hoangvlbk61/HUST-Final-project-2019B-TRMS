# Generated by Django 3.0.7 on 2020-06-22 07:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('examination', '0008_auto_20200622_1400'),
    ]

    operations = [
        migrations.AlterField(
            model_name='examination',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2020, 6, 22, 14, 25, 46, 875533), verbose_name='Thời gian khám'),
        ),
    ]
