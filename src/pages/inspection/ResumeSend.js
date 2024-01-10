import React, { useState } from "react";
import styles from "./ResumeSend.module.css";

const ResumeSend = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <h1 className={styles.title}>나의 이력서를 첨부해 주세요!</h1>
      <h2 className={styles.title2}>나머지는 창규님이 알아서...</h2>
      <div className={styles.fileUploadContainer}>
        <input
          type="file"
          id="fileInput"
          className={styles.fileInput}
          onChange={handleFileChange}
          hidden
        />
        <label htmlFor="fileInput" className={styles.customFileUpload}>
          <span className={styles.plusIcon}>+</span>
        </label>
      </div>
    </>
  );
};

export default ResumeSend;
