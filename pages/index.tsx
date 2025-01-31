import React from "react";
import ReactDOM from "react-dom/client"; // React 18 이후부터는 ReactDOM.createRoot 사용
import App from "./App"; // App.tsx를 import
import "./index.css"; // 전역 스타일 파일 (선택 사항)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
