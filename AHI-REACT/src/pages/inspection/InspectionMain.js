import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import style from "./static/css/inspectionMain.module.css";
import modalStyle from "./static/css/ResumeListModal.module.css";
import warningImg from "./static/image/exclamationinacircle.png";
import { useDispatch, useSelector } from "react-redux";
import {
  callInspectionResumeAPI,
  callPafRaderAPI,
  callResumeDetailAPI,
} from "../../apis/inspectionAPICalls.js";
import Swal from "sweetalert2";
import "font-awesome/css/font-awesome.min.css";

function InspectionMain() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState({});
  const formData = new FormData();
  const [fileName, setFileName] = useState("");
  const [info, setInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoding, setIsLoding] = useState(false);
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
    if (isLogin) {
      e.preventDefault();
      setDragging(true);
      const dropFile = e.dataTransfer.files[0];
      if (dropFile) {
        setFileName(dropFile.name);
        setFile(dropFile);
      }
    } else {
      setIsModalOpen(true);
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
      setIsLoding(true);
      dispatch(callResumeDetailAPI(info)).then((result) => {
        console.log(result);
        if (result.status === 200) {
          setIsLoding(false);
          navigate("/inspection/detail");
        }
      });
    }
    console.log(info);
  }, [info]);

  useEffect(() => {
    if (sessionStorage.getItem("userInfo")) {
      setIsLogin(true);
    }
  }, [userInfo]);

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
    if (file.name) {
      setIsLoding(true);
      const formData = new FormData();
      formData.append("file", file);
      if (formData) {
        dispatch(callPafRaderAPI(formData)).then((result) => {
          if (result.status === 200) navigate("/inspection/detail");
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "등록된 파일이 없습니다.",
      });
    }
  };

  const onClickLogin = () => {
    navigate("/loginForm");
  };

  return (
    <div>
      <div>
        {isLoding && (
          <div className={modalStyle.loadingIndicator}>
            <div className={modalStyle.spinner}></div>
          </div>
        )}
        {isModalOpen && !isLoding && (
          <div className={modalStyle.black_bg}>
            <div className={modalStyle.white_bg} ref={ref}>
              <button onClick={closeModal} className={modalStyle.closeBtn}>
                X
              </button>
              {isLogin && resume?.data.length > 0 && (
                <>
                  <h2 className={modalStyle.mainTitle}>회원 이력서</h2>
                  <p className={modalStyle.mainText}>
                    * 자기소개서가 포함된 이력서만 조회 됩니다.
                  </p>
                  <div>
                    <div className={modalStyle.title_head}>
                      <h4 className={modalStyle.title1}>자소서 번호</h4>
                      <h4 className={modalStyle.title2}>자소서 제목</h4>
                      <h4 className={modalStyle.title3}>자소서 생성일</h4>z1
                    </div>
                    <div className={modalStyle.resumeDev}>
                      {resume?.data.map((res) => (
                        <div className={modalStyle.divTable}>
                          <div
                            key={res.resumeCode}
                            className={modalStyle.divTableCell}
                            onClick={() => onClickResumeHandler(res.resumeCode)}
                          >
                            <p className={modalStyle.title1}>
                              {res.resumeCode}
                            </p>
                            <p className={modalStyle.title2}>
                              {res.resumePath}
                            </p>
                            <p className={modalStyle.createText}>
                              {res.createDate}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {isLogin && resume?.data.length < 1 && (
                <>
                  <h2 className={modalStyle.mainTitle}>회원 이력서</h2>
                  <p className={modalStyle.mainText}>
                    * 자기소개서가 포함된 이력서만 조회 됩니다.
                  </p>
                  <div className={modalStyle.isNull}>
                    <p className={modalStyle.Line}></p>
                    <img className={modalStyle.warningImage} src={warningImg} />
                    <p className={modalStyle.text}>
                      등록된 이력서가 존재하지 않습니다.
                    </p>
                    <p className={modalStyle.Line}></p>
                  </div>
                </>
              )}
              {!isLogin && (
                <>
                  <p className={modalStyle.Line}></p>
                  <h3 className={modalStyle.text}>
                    로그인을 해야 사용 가능한 서비스 입니다.
                  </h3>
                  <div className={modalStyle.BtnDev}>
                    <button
                      className={modalStyle.loginBtn}
                      onClick={onClickLogin}
                    >
                      로그인
                    </button>
                    <button
                      className={modalStyle.cancellationBtn}
                      onClick={closeModal}
                    >
                      취소
                    </button>
                  </div>
                  <p className={modalStyle.Line}></p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={style.container}>
        <h1 className={style.title}>
          <i
            className="fas fa-gear"
            style={{
              marginRight: "15px",
              fontFamily: "FontAwesome",
              color: "#d9d9d9",
            }}
          ></i>
          AI 에게 자기소개서를 첨삭받을 수 있어요!
          <i
            className="fas fa-gear"
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
          PDF로 자기소개서 첨삭받기
        </button>
        <h1 className={style.bubble}>이미 이력서가 있으신가요?</h1>
        <h2 className={style.bubble}>이력서 목록을 확인할 수 있어요!</h2>
        <button className={style.resumeButton} onClick={openModal}>
          내 이력서 확인
        </button>
      </div>
    </div>
  );
}

export default InspectionMain;
