import React from 'react';
import styles from './interviewNav.module.css';
import { NavLink } from 'react-router-dom';
import {  Route, Routes } from "react-router-dom";
import Interview from '../Interview/Interview';
import InterviewSpring from '../InterviewSpring/InterviewSpring';
import { ProtectedRoute } from '../login/ProtectedRoute';
const InterviewNav = () => {
    return (
        <>
        <div className={styles.linkContainer}>
        <NavLink
          to="/interviewNav/interviewSpring"
          className={({ isActive }) =>
            isActive ? `${styles.interviewlink} ${styles.activeLink}` : styles.interviewlink}
        >
            공고
        </NavLink>
        <NavLink
          to="/interviewNav/interview"
          className={({ isActive }) =>
            isActive ? `${styles.interviewlink} ${styles.activeLink}` : styles.interviewlink}
        >
          이력서 질문
        </NavLink>
        </div>

        <Routes>
  <Route index element={<InterviewSpring/>} />
  <Route path='interview' element={<ProtectedRoute><Interview /></ProtectedRoute>} />
  <Route path='interviewSpring' element={<InterviewSpring />} />
</Routes>



        </>
    );
};

export default InterviewNav;