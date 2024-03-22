import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App.tsx'
import Navbar from "./components/Navbar.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Navbar />
      <App />
  </React.StrictMode>,
)
