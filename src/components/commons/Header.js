// components/Header.js
import React from 'react';
import { NavLink  } from 'react-router-dom';
import { useSelector,useDispatch  } from 'react-redux';
import styles from '../commons/Header.module.css';
import {logout} from '../../pages/login/authActions';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', { method: 'POST' });
            if (response.ok) {
                dispatch(logout());
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.removeItem('userInfo'); 
                navigate('/');
            } else {
            }
        } catch (error) {
            console.error('Logout error:', error);
        }

    };

    return(
        <>
            <div className={styles.headerWrapper}>
                <div className={styles.headerMenu}>
                    <div className={styles.asideMenu}>
                        <div className={styles.asideMenuList}>
                            {isLoggedIn ? (
                                <NavLink  className={styles.loginOrLogout} onClick={handleLogout}> 로그아웃 </NavLink>
                            ) : (
                                <NavLink to="/loginForm" className={styles.loginOrLogout}> 로그인 </NavLink>
                            )}
                            {' | '}
                            <NavLink to="/mypage" className={styles.mypage}> 마이페이지 </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
