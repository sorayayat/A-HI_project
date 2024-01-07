import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './mypage.module.css';
import { useEffect, useState } from 'react';
const MyLink = () => {
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        setUserRole(userInfo.role);
      }, []);
    return (
        <div className={styles.linkContainer}>
      {userRole === 'ROLE_MEMBER' && (
        <NavLink
          to="/mypage/member_update"
          className={({ isActive }) =>
            isActive ? `${styles.protectedlink} ${styles.activeLink}` : styles.protectedlink}
        >
          정보변경
        </NavLink>
      )}

      {userRole === 'ROLE_COMPANY' && (
        <NavLink
          to="/mypage/companyUpdate"
          className={({ isActive }) =>
            isActive ? `${styles.protectedlink} ${styles.activeLink}` : styles.protectedlink}
        >
          정보변경
        </NavLink>
      )}
  
        <NavLink
          to="/mypage/changePwd"
          className={({ isActive }) =>
            isActive ? `${styles.protectedlink} ${styles.activeLink}` : styles.protectedlink}
        >
          비밀번호 변경
        </NavLink>
  
        <NavLink
          to="/mypage/withdrawal"
          className={({ isActive }) =>
            isActive ? `${styles.protectedlink} ${styles.activeLink}` : styles.protectedlink}
        >
          회원탈퇴
        </NavLink>
  
        <NavLink
          to="/mypage/postingLike"
          className={({ isActive }) =>
            isActive ? `${styles.protectedlink} ${styles.activeLink}` : styles.protectedlink}
        >
          찜한공고
        </NavLink>
      </div>
    );
  };

export default MyLink;