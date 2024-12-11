import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Review from "./pages/Review";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import RestaurantForm from "./pages/RestaurantForm";
import RestaurantProfile from "./pages/RestaurantProfile";

// Wrapper component to include Navbar
const PageWithNavbar = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Home Route */}
        <Route
          path="/"
          element={
            <PageWithNavbar>
              <Home />
            </PageWithNavbar>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PageWithNavbar>
                <Profile />
              </PageWithNavbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/review"
          element={
            <PageWithNavbar>
              <Review />
            </PageWithNavbar>
          }
        />
        <Route
          path="/restaurants/:id"
          element={
            <PageWithNavbar>
              <RestaurantProfile />
            </PageWithNavbar>
          }
        />
        <Route
          path="/restaurants/new"
          element={
            <PrivateRoute>
              <PageWithNavbar>
                <RestaurantForm />
              </PageWithNavbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/restaurants/:id/edit"
          element={
            <PrivateRoute>
              <PageWithNavbar>
                <RestaurantForm />
              </PageWithNavbar>
            </PrivateRoute>
          }
        />

        {/* Public Routes without Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
