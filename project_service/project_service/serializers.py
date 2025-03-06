from project_service.models import *
from rest_framework import serializers
from datetime import datetime
from project_service.utils import date_start_before_end

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
    
    def create(self, validated_data):

        timeline = validated_data.pop('timeline', None)

        if timeline is None:
            timeline_start = self.initial_data.get('timeline_start', datetime.now())
            timeline_end = self.initial_data.get('timeline_end', datetime.max)

            timeline = Timeline.objects.create(
                timeline_start=timeline_start,
                timeline_end=timeline_end
            )

        project = Project.objects.create(
            **validated_data,
            timeline=timeline
        )
        return project

class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = '__all__'

    def create(self, validated_data):
        timeline_start = validated_data.pop('timeline_start')
        timeline_end = validated_data.pop('timeline_end')

        date_start_before_end(timeline_start,timeline_end)

        timeline = Timeline.objects.create(
            **validated_data,
            timeline_start = timeline_start,
            timeline_end = timeline_end
        )
        return timeline

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

    def create(self, validated_data):
        start_date = validated_data.pop('start_date')
        end_date = validated_data.pop('end_date')

        date_start_before_end(start_date,end_date)

        event = Event.objects.create(
            **validated_data,
            start_date=start_date,
            end_date=end_date
        )
        return event

class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = '__all__'

class ProjectMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMember
        fields = '__all__'
