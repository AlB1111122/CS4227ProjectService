from rest_framework import viewsets
from project_service.models import *
from project_service.serializers import *
from rest_framework.decorators import action
from rest_framework.response import Response

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TimelineViewSet(viewsets.ModelViewSet):
    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    @action(detail=False, methods=["get"])
    def by_project(self, request):
        timeline_id = request.query_params.get("timeline_id")
        if not timeline_id:
            return Response({"error": "timeline_id is required"}, status=400)

        events = Event.objects.filter(timeline=timeline_id)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

class EventTypeViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer

class ProjectMemberViewSet(viewsets.ModelViewSet):
    queryset = ProjectMember.objects.all()
    serializer_class = ProjectMemberSerializer

    @action(detail=True, methods=['get'])
    def projects_roles(self, request, pk=None):
        user_id = pk

        if not user_id:
            return Response({"error": "User ID is required"}, status=400)

        project_members = ProjectMember.objects.filter(user_id=user_id)

        if not project_members.exists():
            return Response([])

        projects_with_roles = []
        for project_member in project_members:
            project = project_member.project_id

            project_member_id = project_member.id
            role = project_member.role
            project_data = ProjectSerializer(project).data
            project_data['project_member_id'] = project_member_id
            project_data['role'] = role
            projects_with_roles.append(project_data)

        return Response(projects_with_roles)
