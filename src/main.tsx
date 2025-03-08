import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/SelectProjPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="user/:userId/projects" element={<ProjectsPage />} />
          <Route
            path="project/:projectMemberId"
            element={<ProjectDetailPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const rootElement = document.querySelector<HTMLDivElement>("#app")!;
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
