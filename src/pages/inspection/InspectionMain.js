import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import style from "./static/css/inspectionMain.module.css";
import modalStyle from "./static/css/ResumeListModal.module.css";
import logo from "../../components/commons/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  callInspectionResumeAPI,
  callResumeDetailAPI,
} from "../../apis/inspectionAPICalls.js";

function InspectionMain() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState([]);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resume = useSelector((state) => state.inspectionReducer.resumelist);
  const dispatch = useDispatch();
  const ref = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(true);
    const files = Array.from(e.dataTransfer.files);
    setFile((prevFile) => [...prevFile, ...files]);
    console.log("asd", e.dataTransfer.files);
    const fileNames = files.map((file) => file.name);
    console.log("드롭한 파일:", fileNames);
    setDroppedFiles((prevFiles) => [...prevFiles, ...fileNames]); // 이전 파일 목록에 새 파일 추가
  };

  // 모달창 내부가 아닌 외부 클릭시 닫힘 로직
  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (isModalOpen && ref.current && !ref.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    dispatch(callInspectionResumeAPI());
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickResumeHandler = (code) => {
    //여기서 현재 로그인한 계정인지 아닌지 체크하면 좋을듯
    dispatch(callResumeDetailAPI(code)).then((result) => {
      console.log(result);
      if (result.status === 200) navigate("/inspection/detail");
    });
  };

  return (
    <div>
      <div>
        {isModalOpen && (
          <div className={modalStyle.black_bg}>
            <div className={modalStyle.white_bg} ref={ref}>
              <button onClick={closeModal} className={modalStyle.closeBtn}>
                X
              </button>
              <h2 className={modalStyle.mainTitle}>회원 이력서</h2>
              <div>
                <div className={modalStyle.title_head}>
                  <h4 className={modalStyle.title1}>자소서 번호</h4>
                  <h4 className={modalStyle.title2}>자소서 제목</h4>
                  <h4 className={modalStyle.title3}>자소서 생성일</h4>
                  <h4 className={modalStyle.title4}>자소서 수정일</h4>
                </div>
                {resume?.data.map((res) => (
                  <div className={modalStyle.divTable}>
                    <div
                      key={res.resumeCode}
                      className={modalStyle.divTableCell}
                      onClick={() => onClickResumeHandler(res.resumeCode)}
                    >
                      <p className={modalStyle.title1}>{res.resumeCode}</p>
                      <p className={modalStyle.title2}>{res.resumePath}</p>
                      <p className={modalStyle.createText}>{res.createDate}</p>
                      <p className={modalStyle.modifyText}>{res.modifyDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={style.container}>
        <img className={style.logo} src={logo} alt="로고" />
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
            <p>{dragging ? "" : "파일을 드래그해 주세요"}</p>
            {droppedFiles && (
              <div>
                {droppedFiles.map((fileName, index) => (
                  <p key={index}>{fileName}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className={style.recommendationButton}>
          PDF 파일로 자소서 첨삭받기
        </button>
        <h1 className={style.noResume}>이력서가 이미 있으신가요?</h1>
        <button className={style.resumeButton} onClick={openModal}>
          이력서 확인하기
        </button>
        <h2 className={style.noResume}>등록된 나의 이력서를 확인해 보세요!</h2>
      </div>
    </div>
  );
}

export default InspectionMain;
