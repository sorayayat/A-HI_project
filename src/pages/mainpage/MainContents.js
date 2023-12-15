import Search from './Search';
import AiService from './AiServices';
import Announcement from './Announcement';
import styles from '../mainpage/MainContents.module.css';


const MainContents = () => {
    return(
        <>
            <div className={styles.mainContainer}>
                {/* 검색 영역 컴포넌트 */}
                    <Search />

                {/* AI 서비스 영역 컴포넌트 */}
                    <AiService />

                {/* 채용 공고 영역 컴포넌트 */}
                    <Announcement />
            </div>
        </>
    )
}

export default MainContents;