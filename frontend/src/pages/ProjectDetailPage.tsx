import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import TimelinePanel from "../components/ProjectDetail/timeline/TimelinePanel";
import ProjectForms from "../components/ProjectDetail/ProjectForms";
import useProjectMember from "../hooks/useProjectMember";
import useTimelineEvents from "../hooks/useTimelineEvents";
import useTimeline from "../hooks/useTimeline";
import useProject from "../hooks/useProject";

const ProjectDetailPage: React.FC = () => {
  const { projectMemberId } = useParams();

  if (!projectMemberId) {
    return <p>Error: malformed URL, no project member found</p>;
  }

  const {
    projectMember,
    loading: loadingPM,
    error: errorPM,
  } = useProjectMember(projectMemberId);

  if (!projectMember) {
    return <p>Error: Project Member not found or invalid ID</p>;
  }

  const {
    project,
    loading: loadingProject,
    error: errorProject,
  } = useProject(projectMember.project_id);

  if (!project || project.timeline == null) {
    return <p>Error: Timeline not found or invalid ID</p>;
  }

  const {
    timeline,
    loading: loadingTimeline,
    error: errorTimeline,
  } = useTimeline(project.timeline);

  if (!timeline) {
    return <p>Error: Timeline not found or invalid timeline ID</p>;
  }

  const {
    events,
    loading: loadingEvents,
    error: errorEvents,
  } = useTimelineEvents(timeline.id);

  const isLoading =
    loadingPM || loadingProject || loadingTimeline || loadingEvents;
  const error = errorPM || errorProject || errorTimeline || errorEvents;

  if (isLoading) {
    return <p>Loading project details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
            projectMember.role === "OWNER" || projectMember.role === "EDITOR"
          }
        />
      </div>
      {projectMember && timeline && (
        <ProjectForms role={projectMember.role} id={timeline.id} />
      )}
    </div>
  );
};

export default ProjectDetailPage;
