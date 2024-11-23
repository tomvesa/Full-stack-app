//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css'
import './styles/global.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import {UserProvider} from './context/UserContext';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
