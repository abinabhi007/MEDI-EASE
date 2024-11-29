import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin } from "./middleware/route";
import React, { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import PrescriptionsList from "./pages/PrescriptionsList.jsx";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Appointments = lazy(() => import("./pages/Appointments"));
const DoctorsList = lazy(() => import("./pages/DoctorRequests"));
const PharmacyList = lazy(() => import("./pages/PharmacyRequests"));
const LaboratoriesList = lazy(() => import("./pages/LaboratoryRequests"));
const Prescriptions = lazy(() => import("./pages/Prescriptions.jsx"));
const LabResults = lazy(() => import("./pages/LabResults"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ApplyDoctor = lazy(() => import("./pages/ApplyDoctor"));
const Error = lazy(() => import("./pages/Error"));

function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/register/patient"
            element={
              <Public>
                <Register />
              </Public>
            }
          />

          <Route
            path="/register/doctor"
            element={
              <Public>
                <Register />
              </Public>
            }
          />

          <Route
            path="/register/pharmacy"
            element={
              <Public>
                <Register />
              </Public>
            }
          />

          <Route
            path="/register/laboratory"
            element={
              <Public>
                <Register />
              </Public>
            }
          />

          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route
            path="/appointments"
            element={
              <Protected>
                <Appointments />
              </Protected>
            }
          />
          <Route
            path="/doctorsList"
            element={
              <Protected>
                <DoctorsList />
              </Protected>
            }
          />
          <Route
            path="/pharmaciesList"
            element={
              <Protected>
                <PharmacyList />
              </Protected>
            }
          />
          <Route
            path="/laboratoriesList"
            element={
              <Protected>
                <LaboratoriesList />
              </Protected>
            }
          />
          <Route
            path="/prescriptions"
            element={
              <Protected>
                <PrescriptionsList />
              </Protected>
            }
          />
          <Route
            path="/labResults/:id"
            element={
              <Protected>
                <LabResults />
              </Protected>
            }
          />
          <Route
            path="/Prescriptions/:id"
            element={
              <Protected>
                <Prescriptions />
              </Protected>
            }
          />
          <Route
            path="/notifications"
            element={
              <Protected>
                <Notifications />
              </Protected>
            }
          />
          <Route
            path="/applyfordoctor"
            element={
              <Protected>
                <ApplyDoctor />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <Admin>
                <Dashboard type={"users"} />
              </Admin>
            }
          />
          <Route
            path="/dashboard/doctors"
            element={
              <Admin>
                <Dashboard type={"doctors"} />
              </Admin>
            }
          />
          <Route
            path="/dashboard/appointments"
            element={
              <Protected>
                <Dashboard type={"appointments"} />
              </Protected>
            }
          />
          <Route
            path="/dashboard/applications"
            element={
              <Protected>
                <Dashboard type={"applications"} />
              </Protected>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
