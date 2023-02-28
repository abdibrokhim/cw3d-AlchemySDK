import React from 'react';
import { Route, Routes } from "react-router-dom";
import NoMatchPage from '../pages/NoMatchPage';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';

const Router = () => (
  <Routes>
    <Route 
        exact path="/" 
        element={
            <LandingPage />
        } 
    />
    <Route 
        path="/main" 
        element={
            <HomePage />
        } 
    />
    <Route 
        path="/profile" 
        element={
            <ProfilePage />
        } 
    />
    <Route 
        path="*" 
        element={
            <NoMatchPage />
        } 
    />
  </Routes>
);

export default Router;