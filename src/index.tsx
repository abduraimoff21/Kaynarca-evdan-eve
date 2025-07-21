import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client"; // Import createRoot from 'react-dom/client'
import { I18nextProvider } from "react-i18next";
import 'antd/dist/reset.css'; // Changed from 'antd/dist/antd.css' to 'antd/dist/reset.css'

import Router from "./router";
import i18n from "./translation";

const App = () => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </BrowserRouter>
);

// Get the root element from the DOM
const rootElement = document.getElementById("root");

// Check if the root element exists before creating the root
if (rootElement) {
  // Create a root and render your App component
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element with ID 'root' not found in the document.");
}
