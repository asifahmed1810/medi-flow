import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayOut from '../LayOut/MainLayOut';
import Home from '../pages/Home/Home';
import JoinUs from '../pages/JoinUs/JoinUs';
import AvailableCamps from '../pages/AvailableCamps/AvailableCamps';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

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
        },
        {
          path:'login',
          element:<Login></Login>
        },
        {
          path:'register',
          element:<Register></Register>
        }
      ]
    },
  ]);

export default router;