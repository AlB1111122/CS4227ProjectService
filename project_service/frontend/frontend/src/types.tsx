export interface Project {
  id: number;
  created_at: string;
  description: string;
  name: string;
  timeline: number | null;
}

export interface Timeline_t {
  id: number;
  created_at: string;
  timeline_start: string;
  timeline_end: string;
}

export interface EventType {
  id: number;
  name: string;
}

export interface Event {
  id: number;
  timeline: number;
  created_at: string;
  start_date: string;
  end_date: string;
  name: string;
  description: string;
  type: string;
  financial_impact: number;
  document_id: number | null;
}

export interface Project {
  id: number;
  created_at: string;
  timeline: number | null;
  name: string;
  description: string;
}

export interface ProjectWRolePMId {
  id: number;
  created_at: string;
  timeline: number | null;
  name: string;
  description: string;
  role: string;
  project_member_id: number;
}

export interface ProjectMember {
  id: number;
  created_at: string;
  project_id: number;
  user_id: number;
  role: "OWNER" | "EDITOR" | "VIEWER";
}
