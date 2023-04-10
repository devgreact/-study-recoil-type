import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";

// 오류 코드
// const root = ReactDOM.createRoot(document.getElementById("root"));

// 풀이 1
// const root = ReactDOM.createRoot(
//   document.getElementById("root") ?? document.createElement("div")
// );

// 풀이 2
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
