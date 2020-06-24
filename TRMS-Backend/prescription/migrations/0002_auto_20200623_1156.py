# Generated by Django 3.0.7 on 2020-06-23 04:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('treatment', '0002_auto_20200623_1151'),
        ('prescription', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prescription',
            name='treatment',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='prescription', to='treatment.Treatment'),
        ),
    ]
