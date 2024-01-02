import React, { useState, useEffect } from 'react';
import styles from './SearchPage.module.css';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';


const SearchPage = () => {
  const [searchParams] = useSearchParams(); // URL 파라미터로 검색어 받아오기
  const searchQuery = searchParams.get('query');

  // const [searchResults, setSearchResults] = useState([]); <<임시 주석>>

  const [loading, setLoading] = useState(true);

  // 임시 데이터
  const [searchResults, setSearchResults] = useState([
    // 가상의 검색 결과 데이터
    { id: 1, title: `${searchQuery}1`, description: "I don't want a lot for Christmas" },
    { id: 2, title: `${searchQuery}2`, description: "There is just one thing I need" },
    { id: 3, title: `${searchQuery}3`, description: "I don't care about the presents underneath the Christmas tree" },
    { id: 4, title: `${searchQuery}4`, description: "I just want you for my own" },
    { id: 5, title: `${searchQuery}5`, description: "More than you could ever know" },
    { id: 6, title: `${searchQuery}6`, description: "Make my wish come true" },
    { id: 7, title: `${searchQuery}7`, description: "All I want for Christmas is you" },
    { id: 8, title: `${searchQuery}8`, description: "Yeah" },
    
  ]);


  useEffect(() => {
    // 검색 결과를 가져오는 API 호출
    axios.get(`/api/search?query=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [searchQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className={styles.searchResultContainer}>
      <div className={styles.titleContainer}>
        <h1><span className={styles.searchQuery}>{`'${searchQuery}'`}</span>{'의 기업 및 공고 검색 결과입니다.'}</h1>
      </div>
      <div className={styles.cardContainer}>
        {searchResults.map(result => (
          <div key={result.id} className={styles.resultCard}>
            <h3 className={styles.resultTitle}>{result.title}</h3>
            <p className={styles.resultDescription}>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchPage;