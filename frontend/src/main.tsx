import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/SelectProjPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="user/:userId/projects" element={<ProjectsPage />} />
            <Route
              path="project/:projectMemberId"
              element={<ProjectDetailPage />}
            />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

const rootElement = document.querySelector<HTMLDivElement>("#app")!;
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
