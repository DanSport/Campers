import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from "./routes/AppRoutes";
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
