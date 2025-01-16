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
import Dashboard from '../LayOut/Dashboard';
import OrganizersProfile from '../pages/Dashboard/OrganizersProfile/OrganizersProfile';
import OrganizerAddCamp from '../pages/Dashboard/OrganizerAddCamp/OrganizerAddCamp';

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
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'organizerProfile',
          element:<OrganizersProfile></OrganizersProfile>
        },
        {
          path:'addcamp',
          element:<OrganizerAddCamp></OrganizerAddCamp>
        }
      ]
    }
  ]);

export default router;