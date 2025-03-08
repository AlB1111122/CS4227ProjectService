# Generated by Django 5.1.6 on 2025-03-01 14:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project_service', '0006_alter_event_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='timeline',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project_service.timeline'),
        ),
        migrations.AlterField(
            model_name='event',
            name='type',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, to='project_service.eventtype'),
        ),
    ]
