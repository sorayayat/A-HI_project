import { NavLink } from 'react-router-dom';
import styles from '../commons/Header.module.css'

const Header = () => {

    return(
        <>
            <div className={styles.headerWrapper}>
                <div className={styles.headerMenu}>
                    {/* 로그인 / 로그아웃 */}
                    {/* 세션에 사용자 정보 있는 경우 '로그아웃', 없는 경우 '로그인'으로 표시 -> 일단 로그인으로 연결할게요. */}
                    <div className={styles.asideMenu}>
                        <div className={styles.asideMenuList}>
                            <NavLink to ="/login" className={styles.loginOrLogout}> 로그인 </NavLink>
                            {' | '}
                            <NavLink to="/mypage" className={styles.mypage}> 마이페이지 </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;