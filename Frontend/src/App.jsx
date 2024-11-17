import { useState } from 'react'
import './App.css'
import Map from './components/Map';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import StartBody from './components/StartBody';
import LoginBody from './components/LoginBody';

const App = () => {
  let routes = createRoutesFromElements([
    <>
      <Route path="/" element={<StartBody />} />
      <Route path="/map" element={<Map />} />
      <Route path="/login" element={<LoginBody />} />
    </>  
  ]);
  let router = createBrowserRouter(routes,{
    future:{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
});

  return (
    <RouterProvider router={router} />
  )
}

export default App
