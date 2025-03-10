import { useState, useEffect } from "react";
import { Project } from "../../types";
import { API_SERVER } from "../../consts";

const useProject = (projectId: number | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_SERVER}project/${projectId}/`);
        if (!response.ok) throw new Error("Failed to fetch project");
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  return { project, loading, error };
};

export default useProject;
