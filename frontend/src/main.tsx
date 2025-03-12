import "./style.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/SelectProjPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import { Provider, useDispatch } from "react-redux";
import { setHeader } from "./redux/store";
import { store } from "./redux/store";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeader({
        title: "Home",
        description:
          "Standin for login page for prototype. This header uses redux to have its text.",
      })
    );
  }, [dispatch]); // Runs only once when App mounts

  return (
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
  );
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const rootElement = document.querySelector<HTMLDivElement>("#app")!;
const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);
