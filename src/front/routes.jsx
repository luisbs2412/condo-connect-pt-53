// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { IncidentPage } from "./pages/tenant/IncidentPage";
import { ReservationPage } from "./pages/tenant/ReservationPage";
import { IncidentManagement } from "./pages/admin/IncidentManagement";
import { RegisterTenantPage } from "./pages/admin/RegisterTenantPage";
import PrivateRoute from "./components/PrivateRoute";
import { PrivateLayout } from './pages/PrivateLayout';
import WelcomePage from "./pages/WelcomePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.
    // Root Route: All navigation will start from here.
    <>
      <Route element={
      <PrivateRoute allowedRoles={['Admin', 'Tenant']} >
        <PrivateLayout />
      </PrivateRoute>
      }>
      
      {/* Proteger Rutas de Tenant */}   
      <Route path="/tenant" element={<PrivateRoute allowedRoles={['Tenant']} >
        <WelcomePage/>
      </PrivateRoute>} />
      <Route path="/tenant/incidents" element={<PrivateRoute allowedRoles={['Tenant']} >
        <IncidentPage />
      </PrivateRoute>} />
      <Route path="/tenant/reservations" element={<PrivateRoute allowedRoles={['Tenant']} >
        <ReservationPage />
      </PrivateRoute>} />

      {/* Proteger Rutas de Admin */}

      <Route path="/admin/incidentsList" element={<PrivateRoute allowedRoles={['Admin']} >
        <IncidentManagement />
      </PrivateRoute>} />
      <Route path="/admin/registerTenant" element={<PrivateRoute allowedRoles={['Admin']} >
        <RegisterTenantPage />
      </PrivateRoute>} />
      </Route>

      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path="/" element={<Home />} />
      </Route>
    </>
  )
);