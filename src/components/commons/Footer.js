import styles from '../commons/Footer.module.css'


const Footer = () => {
    return (
        <>
            <footer className={styles.footerWrapper}>
                <div className={styles.footerRowClass}>
                    <div className={styles.footerText}>
                        <p className={styles.footerP}><span>(주)전지적 개발자 시점</span></p>
                        <p className={styles.footerP}><span>서울특별시 서초구 강남대로 405 통영빌딩</span></p>
                        <p><span>© 2023 JGS, Inc.</span></p> 
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;