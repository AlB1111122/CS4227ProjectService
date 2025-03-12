import { useState, useEffect } from "react";
import { Project } from "../../types";
import { useDispatch } from "react-redux";
import { setHeader } from "../../redux/store";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useProject = (projectId: number | undefined) => {
  const dispatch = useDispatch();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentServer = useSelector((state: RootState) => state.server);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const response = await fetch(`${currentServer}project/${projectId}/`, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
        if (!response.ok) throw new Error("Failed to fetch project");
        const data = await response.json();
        setProject(data);
        dispatch(
          setHeader({
            title: data.name,
            description: data.description,
          })
        );
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
