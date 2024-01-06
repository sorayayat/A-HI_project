import React from 'react';
import ProtectedLink from '../login/ProtectedLink';
import styles from './mypage.module.css';
const MyLink = () => {
    return (
        <div className={styles.linkContainer}>
       <ProtectedLink to="/mypage/member_update" className={styles.protectedlink} roles={['ROLE_MEMBER']}>
    정보변경
</ProtectedLink>
        <div className={styles.marginDiv}></div> {/* 빈 div 요소 추가 */}
        <ProtectedLink to="/mypage/member_update" className={styles.protectedlink} roles={['ROLE_COMPANY']}>
    정보변경
</ProtectedLink>
        <div className={styles.marginDiv}></div> {/* 빈 div 요소 추가 */}
        <ProtectedLink to="/mypage/changePwd" className={styles.protectedlink}>
    비밀번호 변경
</ProtectedLink>
<ProtectedLink to="/mypage/withdrawal" className={styles.protectedlink}>
    회원탈퇴
</ProtectedLink>
        <div className={styles.marginDiv}></div> 
        <ProtectedLink to="/mypage/postingLike" className={styles.protectedlink}>
    찜한공고
</ProtectedLink>

    </div>
    );
};

export default MyLink;