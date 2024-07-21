import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Create from './Create';
import Update from './Update';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/create",
    element: <Create/>

  },
  {
    path: "/update/:id",
    element: <Update/>

  }

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
 
);
