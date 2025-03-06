// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TabContent from './components/TabContent';
import ChatInterface from './pages/ChatInterfacePage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EducationPage from './pages/EducationPage';
import RowingPage from './pages/RowingPage';
import ProgrammingLanguagesPage from './pages/ProgrammingLanguagesPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import MlAiPage from './pages/MlAiPage';
import SkillsPage from './pages/SkillsPage';
import CloudDevOpsPage from './pages/CloudDevOpsPage';
import ExperiencePage from './pages/ExperiencePage';
import ZetaExperiencePage from './pages/ZetaExperiencePage';
import CornellExperiencePage from './pages/CornellExperiencePage';
import ResumePage from './pages/ResumePage';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/rowing" element={<RowingPage />} />
        <Route path="/chat" element={<ChatInterface />} />

        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/experience/zeta" element={<ZetaExperiencePage />} />
        <Route path="/experience/cornell" element={<CornellExperiencePage />} />
        <Route path="/experience/resume" element={<ResumePage />} />

        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/skills/programming" element={<ProgrammingLanguagesPage />} />
        <Route path="/skills/web" element={<WebDevelopmentPage />} />
        <Route path="/skills/ml-ai" element={<MlAiPage />} />
        <Route path="/skills/cloud" element={<CloudDevOpsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;