import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayOut from '../LayOut/MainLayOut';
import Home from '../pages/Home/Home';
import JoinUs from '../pages/JoinUs/JoinUs';
import AvailableCamps from '../pages/AvailableCamps/AvailableCamps';

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
            path:'contactUs',
            element:<JoinUs></JoinUs>
        },
        {
          path:'availablecamps',
          element:<AvailableCamps></AvailableCamps>
        }
      ]
    },
  ]);

export default router;