import { createRoot } from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './styles/globals.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <>
      <App />
      <ToastContainer />
    </>
  </BrowserRouter>
);
