import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayOut from '../LayOut/MainLayOut';
import Home from '../pages/Home/Home';

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut></MainLayOut>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            
        }
      ]
    },
  ]);

export default router;