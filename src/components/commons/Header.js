// components/Header.js
import React from 'react';
import { NavLink  } from 'react-router-dom';
import styles from '../commons/Header.module.css';
import { useNavigate } from 'react-router-dom';
import logonav from './logonav.png';
import { clearChatRoomData } from '../../modules/chatbotModules'; 
import { useDispatch } from 'react-redux';
const serverIp = process.env.REACT_APP_SPRING_APP_SERVER_IP;
const serverPort = process.env.REACT_APP_SPRING_APP_SERVER_PORT;

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const userInfo = sessionStorage.getItem('userInfo');

    const handleLogout = async () => {
        try {
            const response = await fetch(`http://${serverIp}:${serverPort}/logout`, { method: 'POST' });
            if (response.ok) {
                // localStorage.setItem('isLoggedIn', 'false');
                // localStorage.removeItem('userInfo'); 
              //  sessionStorage.setItem('isLoggedIn', 'false');
                sessionStorage.removeItem('userInfo');
                dispatch(clearChatRoomData());
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
                <NavLink to="/" > <img src={logonav} alt='paperIcon' style={{width: "85px"}}/> </NavLink>
                    <div className={styles.asideMenu}>
                        <div className={styles.asideMenuList}>
                        {userInfo  ? (
                            <>
                                <NavLink className={styles.loginOrLogout} onClick={handleLogout}>로그아웃</NavLink>
                                {' | '}
                                <NavLink to="/mypage" className={styles.mypage}> 마이페이지 </NavLink>
                                </>
                            ) : (
                                <>
                                <NavLink to="/loginForm" className={styles.loginOrLogout}>로그인</NavLink>
                                {' | '}
                                <NavLink to="/joinForm" className={styles.loginOrLogout}>회원가입</NavLink> 
                                </>
                            )}
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
