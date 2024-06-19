import style from "./Recommendation.module.css";
import { useState, useEffect } from "react";
// import logo from "./images/KakaoTalk_20231218_121636945 (2).jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callRecommendationResume } from "../../apis/recommendationAPICalls";
import RecommendationModal from "./RecommendationModal";
import { postRecommendation } from "../../modules/recommendationModules";
import { LoadingSpiner } from "../../other/LoadingSpiner";
import Swal from "sweetalert2";

function Recommendation() {
  const [dragging, setDragging] = useState(false);
  const [file, setfile] = useState();
  const [droppedFiles, setDroppedFiles] = useState();
  const dispatch = useDispatch();
  const selectPosting = useSelector((state) => state.recommendationReducer);
  useEffect(() => {
    dispatch(postRecommendation({}));
  }, []);

  const selectPostingData = selectPosting?.response?.data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(true);

    const files = Array.from(e.dataTransfer.files);

    const nonPdfFiles = files.filter((file) => file.type !== "application/pdf");

    if (nonPdfFiles.length > 0) {
      // PDF가 아닌 파일에 대한 경고창 표시
      Swal.fire({
        icon: "error",
        title: "잘못된 파일 형식",
        text: "PDF 파일만 드래그해 주세요.",
      });

      setDragging(false);
      return;
    }

    setfile(files);

    console.log("asd", e.dataTransfer.files);

    const fileNames = files.map((file) => file.name);
    console.log("드롭한 파일:", fileNames);

    setDroppedFiles(fileNames); // 이전 파일 목록에 새 파일 추가
  };

  const onClickRecommendationHandler = () => {
    if (file === undefined) {
      Swal.fire({
        icon: "info",
        text: "먼저 파일을 넣어 주세요.",
      });
    } else {
      const formData = new FormData();

      console.log("gd", file[0]);

      formData.append("file", file[0]);

      dispatch(
        callRecommendationResume({
          file: formData,
        })
      );

      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className={style.container}>
        <h1 className={style.title}>
          <i
            className="fas fa-font-awesome"
            style={{
              marginRight: "15px",
              fontFamily: "FontAwesome",
              color: "#d9d9d9",
            }}
          ></i>
          나에게 딱 맞는 공고를 찾아 보세요!
          <i
            className="fas fa-font-awesome"
            style={{
              marginLeft: "15px",
              fontFamily: "FontAwesome",
              color: "#d9d9d9",
            }}
          ></i>
        </h1>
        <div className={style.attachedFile}>
          <div
            className={style.uploadBox}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            style={{
              border: "2px dashed #ccc",
              textAlign: "center",
              backgroundColor: dragging ? "gray" : "white",
            }}
          >
            <p>{dragging ? "" : "이력서 파일을 드래그해 주세요"}</p>

            {droppedFiles && (
              <div>
                {droppedFiles.map((fileName, index) => (
                  <p key={index}>{fileName}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className={style.recommendationButton}
          onClick={onClickRecommendationHandler}
        >
          공고 추천받기
        </button>

        <h1 className={style.bubble}>이력서가 없으신가요?</h1>
        <h2 className={style.bubble}>AI가 이력서 작성을 도와드려요!</h2>

        <Link to="/chatbot" className={style.resumeButton}>
          작성 바로가기
        </Link>

        {isModalOpen && (
          <RecommendationModal
            selectPostingData={selectPostingData}
            closeModal={closeModal}
          />
        )}
      </div>
    </>
  );
}

export default Recommendation;
