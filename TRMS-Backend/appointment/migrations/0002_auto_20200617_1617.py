# Generated by Django 3.0.7 on 2020-06-17 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='time',
            field=models.DateTimeField(verbose_name='start time'),
        ),
    ]
