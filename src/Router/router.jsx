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
import CampDetailsPage from '../pages/CampDetailsPage/CampDetailsPage';
import OrganizerManageCamps from '../pages/OrganizerManageCamps/OrganizerManageCamps';
import OrganizerUpdateCamp from '../pages/OrganizerUpdateCamp/OrganizerUpdateCamp';
import ManageRegisteredCamp from '../pages/ManageRegisteredCamp/ManageRegisteredCamp';
import UserAnalyticsPage from '../pages/UserAnalyticsPage/UserAnalyticsPage';
import UserProfile from '../pages/UserProfile/UserProfile';
import AllUsers from '../pages/Allusers/AllUsers';




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'contactUs',
        element: <JoinUs></JoinUs>
      },
      {
        path: 'availablecamps',
        element: <AvailableCamps></AvailableCamps>
      },
      {
        path: 'camp-details/:campId',
        element: <CampDetailsPage></CampDetailsPage>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'organizerProfile',
        element: <OrganizersProfile></OrganizersProfile>
      },
      {
        path: 'addcamp',
        element: <OrganizerAddCamp></OrganizerAddCamp>
      },
      {
        path:'manageCamp',
        element:<OrganizerManageCamps></OrganizerManageCamps>
      },
      {
        path:'updateCamp/:campId',
        element:<OrganizerUpdateCamp></OrganizerUpdateCamp>
      },
      {
        path:'manageregisteredcamps',
        element:<ManageRegisteredCamp></ManageRegisteredCamp>
      },
      {
        path:'allusers',
        element:<AllUsers></AllUsers>
      },
      {
        path:'analytics',
        element:<UserAnalyticsPage></UserAnalyticsPage>
      },
      {
        path:'userProfile',
        element:<UserProfile></UserProfile>
      }
    ]
  }
]);

export default router;