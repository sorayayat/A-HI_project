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
    { id: 1, title: `${searchQuery}`, description: "누가 DB 연결 좀 해 줘" },
    { id: 2, title: `${searchQuery}`, description: "누가 DB 연결 좀 해 줘" },
    { id: 3, title: `${searchQuery}`, description: "누가 DB 연결 좀 해 줘" },
    { id: 4, title: `${searchQuery}`, description: "누가 DB 연결 좀 해 줘" },
    { id: 5, title: `${searchQuery}`, description: "누가 DB 연결 좀 해 줘" },
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
      <h1><span className={styles.searchQuery}>{`'${searchQuery}'`}</span>{'의 기업 및 공고 검색 결과입니다.'} </h1>
      {searchResults.map(result => (
        <div key={result.id} className={styles.resultCard}>
          <h3 className={styles.resultTitle}>{result.title}</h3>
          <p className={styles.resultDescription}>{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;