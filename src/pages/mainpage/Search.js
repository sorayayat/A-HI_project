import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.css";
import logoImage from "../../components/commons/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callSearchCompany } from "../../apis/postingAPICalls";

const highlightText = (text, highlight) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} style={{ color: "#3674EA" }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const [companyName, setCompanyName] = useState([]);
  const companyList = useSelector(
    (state) => state.companyReducer?.searchCompany
  );
  const dispatch = useDispatch();

    useEffect(() => {
        if(inputValue.length >= 2)
        dispatch(callSearchCompany({}))
    },[])

    useEffect(() =>{
        if(companyList?.data){
            setCompanyName(companyList.data.map(company => company.company))
        }
    },[])


  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSelectedResultIndex(-1); // 입력이 변경될 때 선택 초기화

    if (value) {
      const filteredResults = companyName.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
      setShowDropDown(true);
    } else {
      setSearchResults([]);
      setShowDropDown(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setSelectedResultIndex((prevIndex) =>
        prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setSelectedResultIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    } else if (event.key === "Enter") {
      if (inputValue.trim() && selectedResultIndex >= 0) {
        executeSearch(searchResults[selectedResultIndex]);
      } else if (inputValue.trim()) {
        executeSearch(inputValue);
      }
    }
  };

  const executeSearch = (searchTerm) => {
    navigate(`/SearchPage?query=${searchTerm}`);
  };

  const handleResultClick = (result) => {
    executeSearch(result);
  };

  return (
    <>
      <div className={styles.searchLogo}>
        <Link to="/">
          <img
            src={logoImage}
            style={{ width: "250px", height: "180px" }}
            alt="logoImage"
          />
        </Link>
      </div>
      <div className={styles.searchWrapper}>
        <div className={styles.searchBar}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.faMagnifyingGlass}
            style={{ cursor: "pointer" }}
          />
          <input
            type="search"
            className={styles.searchBox}
            autoComplete="off"
            placeholder="기업 및 채용 공고를 검색해 보세요!"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {showDropDown && (
            <div className={styles.searchResults}>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className={`${styles.searchResultItem} ${
                    index === selectedResultIndex ? styles.selected : ""
                  }`}
                  onClick={() => handleResultClick(result)}
                >
                  {highlightText(result, inputValue)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
