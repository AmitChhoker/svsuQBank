import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";

import "./footer.css";
import ChatAIPage from "./src/pages/ChatAIPage";
import Admin from "./src/components/Admin";
import SFET from "./SFET";
import SFASH from "./SFASH";
import SFMSR from "./SFMSR";              // ✅ fixed
import SFA from "./SFA";
import LoginForm from "./src/components/LoginForm";
import FeederSchool from "./src/components/FeederSchool";
import UploadQuestionPaper from "./src/components/UploadQuestionPaper";

export default function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<SFET />} />
          <Route path="/SFASH" element={<SFASH />} />
          <Route path="/SFMSR" element={<SFMSR />} />
          <Route path="/SFA" element={<SFA />} />
          <Route path="/chat-ai" element={<ChatAIPage />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/FeederSchool" element={<FeederSchool />} />
          <Route path="/QBankUpload" element={<UploadQuestionPaper />} />
        </Routes>
      </HashRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);