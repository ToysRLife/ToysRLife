//Add React.StrictMode and render App component in index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import './index.css';
import App from './App.tsx';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
);
