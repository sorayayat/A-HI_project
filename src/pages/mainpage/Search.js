import styles from './Search.module.css';
import logoImage from '../../components/commons/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Search = () => {
    return (
        <>
            {/* 검색창 위 로고 */}
            <div className={styles.searchLogo}>
                <Link to="/">
                    <img src={logoImage} style={{ width:"250px", height:"180px"}} alt="logoImage" />
                </Link>
            </div>
            {/* 검색창 */}
            <div className={styles.searchWrapper}>
                <div className={styles.searchBar}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.faMagnifyingGlass} style={{cursor: 'pointer'}} />
                    <input type="search" className={styles.searchBox} autocomplete='off' placeholder="기업, 채용공고를 검색해보세요">
                    </input> 
                </div>
            </div>
        </>
    )
}

export default Search;