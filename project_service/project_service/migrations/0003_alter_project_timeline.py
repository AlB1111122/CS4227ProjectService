# Generated by Django 5.1.6 on 2025-02-25 20:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project_service', '0002_alter_project_timeline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='timeline',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='project_service.timeline'),
        ),
    ]
