// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import Review from "./pages/Review";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import CreateRestaurant from "./pages/CreateRestaurant";
import RestaurantProfile from "./pages/RestaurantProfile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Protected Home Route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <PrivateRoute>
              <PostDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/review"
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />

        <Route
          path="/restaurants/:id"
          element={
            <PrivateRoute>
              <RestaurantProfile />
            </PrivateRoute>
          }
        />
        

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createRestaurant" element={<CreateRestaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
