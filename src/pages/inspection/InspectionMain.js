import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import style from "./static/css/inspectionMain.module.css";
import modalStyle from "./static/css/ResumeListModal.module.css";
import logo from "../../components/commons/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  callInspectionResumeAPI,
  callPafRaderAPI,
  callResumeDetailAPI,
} from "../../apis/inspectionAPICalls.js";
import Swal from "sweetalert2";

function InspectionMain() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState({});
  const formData = new FormData();
  const [fileName, setFileName] = useState("");
  const [info, setInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resume = useSelector((state) => state.inspectionReducer.resumelist);
  const dispatch = useDispatch();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const ref = useRef();
  const Toast = Swal.mixin({
    toast: true,
    position: "ri",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", () => Swal.stopTimer());
      toast.addEventListener("mouseleave", () => Swal.resumeTimer());
    },
  });

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(true);
    const dropFile = e.dataTransfer.files[0];
    if (dropFile) {
      setFileName(dropFile.name);
      setFile(dropFile);
    }
  };
  useEffect(() => {
    const clickOutside = (e) => {
      if (isModalOpen && ref.current && !ref.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (info?.resumeCode) {
      dispatch(callResumeDetailAPI(info)).then((result) => {
        console.log(result);
        if (result.status === 200) navigate("/inspection/detail");
      });
    } else console.log(info);
  }, [info]);

  const openModal = () => {
    setIsModalOpen(true);
    dispatch(callInspectionResumeAPI(userInfo));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickResumeHandler = (code) => {
    setInfo({
      resumeCode: code,
      memberDto: userInfo,
    });
  };

  const onClickPdfHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
    if (formData) {
      dispatch(callPafRaderAPI(formData)).then((result) => {
        if (result.status === 200) navigate("/inspection/detail");
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "등록된 파일이 없습니다.",
      });
    }
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
            <p>{dragging ? "" : "여기로 파일을 드래그하세요"}</p>
            {file && (
              <div>
                <p>{file.name}</p>
              </div>
            )}
          </div>
        </div>

        <button
          className={style.recommendationButton}
          onClick={onClickPdfHandler}
        >
          PDF 파일로 자소서 평가 받기
        </button>
        <h1 className={style.noResume}>등록된 이력서가 있다면?</h1>
        <button className={style.resumeButton} onClick={openModal}>
          내 이력서 확인
        </button>
        <h2 className={style.noResume}>이력서 확인!</h2>
      </div>
    </div>
  );
}

export default InspectionMain;
