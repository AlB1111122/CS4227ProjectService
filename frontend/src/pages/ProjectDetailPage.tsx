import React, { useEffect, useState } from "react";
import { ProjectMember, Timeline_t, Event, Project } from "../types";
import { API_SERVER } from "../consts";
import { useParams } from "react-router-dom";
import TimelinePanel from "../components/ProjectDetail/timeline/TimelinePanel";
import Header from "../components/Header";
import NewEventForm from "../components/ProjectDetail/timeline/NewEventForm";
import NewUserForm from "../components/ProjectDetail/NewUserForm";
import { Stack } from "@mui/material";
import EditProjectForm from "../components/ProjectDetail/ProjectEditForm";

const ProjectDetailPage: React.FC = () => {
  const [projectMember, setProjectMember] = useState<ProjectMember>();
  const [project, setProject] = useState<Project>();
  const [timeline, setTimeline] = useState<Timeline_t>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { projectMemberId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          API_SERVER + "project_member/" + projectMemberId + "/"
        );
        const dataPM: ProjectMember = await response.json();
        setProjectMember(dataPM);
        console.log(dataPM);

        const responseProject = await fetch(
          API_SERVER + "project/" + dataPM.project_id + "/"
        );
        const dataProject: Project = await responseProject.json();
        setProject(dataProject);
        console.log(dataProject);

        const responseTimeline = await fetch(
          API_SERVER + "timeline/" + dataProject.timeline + "/"
        );
        const dataTimeline: Timeline_t = await responseTimeline.json();
        setTimeline(dataTimeline);
        console.log(dataTimeline);

        const responseEvents = await fetch(
          API_SERVER + "event/by_project/?timeline_id=" + dataTimeline.id
        );
        const dataEv: Event[] = await responseEvents.json();

        dataEv.sort(
          (a, b) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        setEvents(dataEv);
        console.log(dataEv);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);
  if (!loading) {
    return (
      <div>
        <Header main={project?.name} sub={project?.description} />
        <div
          style={{
            width: "100%",
            flexGrow: 1,
            flexDirection: "column",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <TimelinePanel
            events={events}
            timeline={timeline}
            editPermission={
              projectMember?.role == "OWNER" || projectMember?.role == "EDITOR"
            }
          />
        </div>
        <Stack direction={"row"} width={"100%"} paddingTop={1}>
          {projectMember?.role == "OWNER" || projectMember?.role == "EDITOR" ? (
            <NewEventForm timelineId={timeline?.id} />
          ) : null}
          {projectMember?.role == "OWNER" ? (
            <Stack direction={"column"} width={"100%"} maxHeight={"100%"}>
              <NewUserForm projectId={project?.id} />
              <EditProjectForm projectId={project?.id} />
            </Stack>
          ) : null}
        </Stack>
      </div>
    );
  }
};

export default ProjectDetailPage;
