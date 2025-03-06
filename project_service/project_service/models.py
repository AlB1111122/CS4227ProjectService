from django.db import models
from django.db.models import Q, CheckConstraint

class Timeline(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    timeline_start = models.DateField()
    timeline_end = models.DateField()

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(timeline_end__gt=models.F("timeline_start")),
                name="Timeline_end_after_start"
            )
        ]

class Project(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    timeline = models.OneToOneField(Timeline, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=600)

class EventType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

class Event(models.Model):
    id = models.AutoField(primary_key=True)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField()
    end_date = models.DateField()
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=600)
    type = models.ForeignKey(EventType, on_delete=models.SET_DEFAULT, default=None, blank=True, null=True)
    financial_impact = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    document_id = models.IntegerField(blank=True, null=True)#use this to get asociated docs from the doc microservice

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(end_date__gt=models.F("start_date")), 
                name="Event_end_after_start"
            )
        ]

class ProjectMember(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['project_id', 'user_id'], name='user_once_per_project')
        ]
    class Role(models.TextChoices):
        OWNER = 'OWNER'
        EDITOR = 'EDITOR'
        VIEWER = 'VIEWER'

    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE, db_index=True)
    user_id = models.IntegerField()#not unique
    role = models.CharField(max_length=255,choices=Role.choices,default=Role.VIEWER, null=False,blank=True)
