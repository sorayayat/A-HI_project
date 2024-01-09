import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';
import logoImage from '../../components/commons/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { callSearchCompany } from '../../apis/postingAPICalls'


// 드롭 박스 텍스트 색상 변경



const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={index} style={{ color: '#3674EA' }}>{part}</span>
                ) : (
                    part // 일치하지 않는 텍스트는 기본 스타일로 렌더링
                )
            )}
        </span>
    );
};

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const [showDropDown, setShowDropDown] = useState(false);
    const companyList = useSelector(state => state.companyReducer?.searchCompany);

    
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(callSearchCompany({

        }))
    },[])

    
    

    // 임시 검색 데이터
    const companyName = companyList?.data?.map(company => company?.company);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value) {
            const filteredResults = companyName.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults);
            setShowDropDown(true);
        } else {
            setSearchResults([]);
            setShowDropDown(false);
        }

    };

    // 검색 실행
    const executeSearch = (searchTerm) => {
        navigate(`/SearchPage?query=${searchTerm}`); // URL의 쿼리 파라미터로 검색어 넘기기
    };

    // Enter 키 실행
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            executeSearch(inputValue);
        }
    };

    // 자동 완성 결과 클릭
    const handleResultClick = (result) => {
        executeSearch(result); // 클릭된 항목으로 검색 실행
    };

    return (
        <>
            <div className={styles.searchLogo}>
                <Link to="/">

                    <img src={logoImage} style={{ width:"250px", height:"180px"}} alt="logoImage" />

                </Link>
            </div>
            <div className={styles.searchWrapper}>
                <div className={styles.searchBar}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.faMagnifyingGlass} style={{ cursor: 'pointer' }} />
                    <input
                        type="search"
                        className={styles.searchBox}
                        autoComplete="off"
                        placeholder="기업 및 채용 공고를 검색해 보세요!"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown} // Enter 키 핸들러 추가
                    />
                    {showDropDown && (
                        <div className={styles.searchResults}>
                            {searchResults.map((result, index) => (
                                <div key={index} className={styles.searchResultItem} onClick={() => handleResultClick(result)}>
                                    {highlightText(result, inputValue)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Search;
